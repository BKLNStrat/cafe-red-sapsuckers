#!/bin/bash
# Scrape Menufy menus using Chrome on macOS via AppleScript.
# Outputs JSON files to /tmp/ for menufy-sync.mjs to consume.
#
# Usage: Run on the Mac node, or via nodes.run from the server.

set -e

EXTRACT_JS='JSON.stringify([...document.querySelectorAll("[class*=category], [class*=Category], .menu-category, section")].filter(c => c.querySelectorAll("[class*=item-name], [class*=itemName], [class*=product-name]").length > 0).map(c => ({title: (c.querySelector("[class*=category-name], [class*=categoryName], [class*=category-title], h2, h3") || {}).textContent?.trim() || "Menu", items: [...c.querySelectorAll("[class*=menu-item], [class*=menuItem], [class*=product], [class*=item-row]")].map(i => ({name: (i.querySelector("[class*=item-name], [class*=itemName], [class*=product-name], [class*=name]") || {}).textContent?.trim() || "", price: (i.querySelector("[class*=item-price], [class*=itemPrice], [class*=product-price], [class*=price]") || {}).textContent?.trim() || "", desc: (i.querySelector("[class*=item-desc], [class*=itemDesc], [class*=description]") || {}).textContent?.trim() || ""}))})))'

scrape_menufy() {
  local url="$1"
  local outfile="$2"
  local name="$3"
  
  echo "Scraping $name ($url)..."
  
  # Open URL in Chrome
  osascript -e "tell application \"Google Chrome\" to open location \"$url\""
  sleep 5
  
  # Wait for menu content to load
  osascript -e 'tell application "Google Chrome" to tell active tab of window 1 to execute javascript "document.readyState"'
  sleep 3
  
  # Extract menu data
  local result
  result=$(osascript -e "tell application \"Google Chrome\" to tell active tab of window 1 to execute javascript \"$EXTRACT_JS\"" 2>/dev/null || echo "[]")
  
  # If generic extraction failed, try a simpler fallback
  if [ "$result" = "[]" ] || [ -z "$result" ]; then
    echo "  Primary extraction found nothing, trying fallback..."
    local FALLBACK_JS='JSON.stringify((function(){var items=[];var cats=document.querySelectorAll("h2,h3,.category-name");var sections=[];cats.forEach(function(c){var sec={title:c.textContent.trim(),items:[]};var el=c.nextElementSibling;while(el&&!el.matches("h2,h3,.category-name")){var name=el.querySelector(".name,.item-name,.product-name");var price=el.querySelector(".price,.item-price,.product-price");if(name){sec.items.push({name:name.textContent.trim(),price:price?price.textContent.trim():"",desc:""})}el=el.nextElementSibling}if(sec.items.length)sections.push(sec)});return sections})())'
    result=$(osascript -e "tell application \"Google Chrome\" to tell active tab of window 1 to execute javascript \"$FALLBACK_JS\"" 2>/dev/null || echo "[]")
  fi
  
  echo "$result" > "$outfile"
  local count=$(echo "$result" | python3 -c "import json,sys; d=json.load(sys.stdin); print(sum(len(s.get('items',[])) for s in d))" 2>/dev/null || echo "0")
  echo "  Saved $count items to $outfile"
}

scrape_menufy "https://www.ordersapsuckers.com/" "/tmp/menufy-sapsuckers.json" "Sapsuckers"
scrape_menufy "https://www.ordercafered.com/" "/tmp/menufy-cafe-red.json" "Cafe Red"

echo ""
echo "Scrape complete. Transfer files to server and run:"
echo "  SANITY_WRITE_TOKEN=<token> node scripts/menufy-sync.mjs"
