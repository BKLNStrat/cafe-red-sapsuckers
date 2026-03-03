#!/usr/bin/env python3
"""
Write the CMS Guide into a Google Doc with BStrat formatting.
Uses Google Docs API batch updates for precise style control.
"""

import os, sys, json, urllib.request, urllib.error

sys.path.insert(0, os.path.expanduser('~/clawd/tools'))

TOKEN_DIR = os.path.expanduser('~/.clawdbot/google-tokens')
DOC_ID = '1I6uF64Br4d-tBRes5_FdsRqhgP0q-W_I3zED5cHK8c0'

def get_token(account):
    with open(f'{TOKEN_DIR}/{account}.json') as f:
        data = json.load(f)
    return data['access_token'] if 'access_token' in data else data['token']

def api(url, token, method='GET', body=None):
    data = json.dumps(body).encode() if body else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header('Authorization', f'Bearer {token}')
    if data:
        req.add_header('Content-Type', 'application/json')
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        print(f"API Error {e.code}: {e.read().decode()[:500]}")
        sys.exit(1)

# BStrat style constants
BLUE = {'red': 0, 'green': 0.4392157, 'blue': 0.7529412}
BLACK = {'red': 0, 'green': 0, 'blue': 0}
LINK_BLUE = {'red': 0.07, 'green': 0.33, 'blue': 0.8}

def heading_style():
    return {
        'weightedFontFamily': {'fontFamily': 'Calibri', 'weight': 700},
        'fontSize': {'magnitude': 11, 'unit': 'PT'},
        'bold': True,
        'foregroundColor': {'color': {'rgbColor': BLUE}},
    }

def body_style():
    return {
        'weightedFontFamily': {'fontFamily': 'Calibri', 'weight': 400},
        'fontSize': {'magnitude': 11, 'unit': 'PT'},
        'bold': False,
        'foregroundColor': {'color': {'rgbColor': BLACK}},
    }

def header_label_style():
    return {
        'weightedFontFamily': {'fontFamily': 'Lato', 'weight': 400},
        'fontSize': {'magnitude': 10.5, 'unit': 'PT'},
        'bold': False,
        'foregroundColor': {'color': {'rgbColor': BLACK}},
    }

def title_style():
    return {
        'weightedFontFamily': {'fontFamily': 'Lato', 'weight': 700},
        'fontSize': {'magnitude': 10.5, 'unit': 'PT'},
        'bold': True,
        'foregroundColor': {'color': {'rgbColor': BLACK}},
    }

# Guide content structure
TITLE_LINE = "WEBSITE MANAGEMENT GUIDE"

HEADER_FIELDS = [
    ("To:", "Kelley Danek, Cafe Red & Sapsuckers"),
    ("From:", "Andrew MacDowell, Brooklyn Strategic"),
    ("Date:", "March 2026"),
    ("Subject:", "Website Management Guide for Cafe Red and Sapsuckers"),
]

# Sections: (heading_text, body_paragraphs)
# body_paragraphs is a list of strings or tuples:
#   str -> regular paragraph
#   ("bullet", text) -> bullet point
#   ("subbullet", text) -> sub-bullet
#   ("bold_inline", label, text) -> bold label followed by regular text

SECTIONS = [
    ("OVERVIEW", [
        "Your new websites for Cafe Red and Sapsuckers are built on two platforms that work together:",
        ("bullet", "Astro \u2014 the framework that generates your website pages (fast, lightweight, secure)"),
        ("bullet", "Sanity Studio \u2014 the content dashboard where you edit menus, hours, events, and other content through a visual interface (no code required)"),
        "",
        "Your existing integrations are unchanged:",
        ("bullet", "Online ordering \u2014 Menufy handles all orders via ordercafered.com and ordersapsuckers.com"),
        ("bullet", "Reservations \u2014 OpenTable handles all bookings via your existing OpenTable pages"),
        "",
        "Menufy and OpenTable are not affected by the new website. The website buttons simply link to them.",
    ]),

    ("WHAT YOU CAN UPDATE YOURSELF", [
        "Through Sanity Studio (no technical skills needed):",
        ("bullet", "Menu items, prices, and descriptions"),
        ("bullet", "Restaurant hours"),
        ("bullet", "Contact information and addresses"),
        ("bullet", "About section text and headings"),
        ("bullet", "Events and specials announcements"),
        ("bullet", "Announcement banners (e.g., holiday closures, special events)"),
        ("bullet", "Photo galleries"),
        "",
        "Through Menufy (as you do now \u2014 unchanged):",
        ("bullet", "Online ordering menu, prices, and availability"),
        ("bullet", "Delivery and pickup settings"),
        "",
        "Through OpenTable (as you do now \u2014 unchanged):",
        ("bullet", "Reservation availability and settings"),
    ]),

    ("GETTING STARTED", [
        "Step 1: Accept your invitation",
        "You will receive an email from Sanity (no-reply@sanity.io) inviting you to the Cafe Red Sapsuckers project. Click the link in that email to create your free Sanity account. You can sign up with Google (recommended) or create a username and password. This is a one-time setup.",
        "",
        "Step 2: Open Sanity Studio",
        "Bookmark this link \u2014 it is your content dashboard:",
        "http://104.236.69.208:3333/",
        "(This URL will move to a cleaner address once the domains are pointed to the new server.)",
        "",
        "Step 3: Log in",
        ("bullet", "Go to the Studio URL above"),
        ("bullet", "Click Log in (or Sign in with Google if you used Google to create your account)"),
        ("bullet", "You will see the content dashboard with categories on the left sidebar"),
        "",
        "If you are already logged in from accepting the invitation, the dashboard will load automatically.",
    ]),

    ("EDITING MENUS", [
        "Your website menus are fully editable in Sanity Studio.",
        "",
        "To edit an existing dish:",
        ("bullet", "Click Dishes in the left sidebar"),
        ("bullet", "Click the dish you want to change"),
        ("bullet", "Edit the name, price, or description"),
        ("bullet", "Click Publish in the bottom-right corner"),
        "",
        "To add a new dish:",
        ("bullet", "Click Dishes in the sidebar, then click + Create"),
        ("bullet", "Fill in the name, select the restaurant (Sapsuckers or Cafe Red), enter the price, and optionally add a description"),
        ("bullet", "Click Publish"),
        ("bullet", "Then go to Menu Sections, find the section it belongs to (e.g., Appetizers), and add the new dish to the list"),
        "",
        "To remove a dish:",
        ("bullet", "Find the dish in Dishes"),
        ("bullet", "Click the \u2026 menu in the top-right corner and choose Unpublish (hides it) or Delete (removes permanently)"),
        ("bullet", "If deleting, also remove it from the Menu Section it was listed in"),
        "",
        "To reorder sections or dishes:",
        ("bullet", "Menu Sections have a Sort Order number \u2014 lower numbers appear first on the menu page"),
        ("bullet", "Dishes within a section can be reordered by dragging them in the Menu Section editor"),
    ]),

    ("SYNCING FROM MENUFY", [
        "There is an optional tool that can automatically pull your current Menufy menu into Sanity. When run, it:",
        ("bullet", "Compares Menufy prices and items against what is currently in Sanity"),
        ("bullet", "Creates draft entries for anything new or changed"),
        ("bullet", "You review the drafts in Studio and publish what you want"),
        "",
        "This is a convenience feature \u2014 you never have to use it. You can always edit menus directly in Sanity. If you would like to run a sync, contact Brooklyn Strategic and we will handle it.",
    ]),

    ("EDITING HOURS AND CONTACT INFORMATION", [
        ("bullet", "Click Locations in the left sidebar"),
        ("bullet", "Select the restaurant (Sapsuckers or Cafe Red)"),
        ("bullet", "Edit the Hours, Phone, Address, or any other field"),
        ("bullet", "Click Publish"),
        "",
        "Current hours on file:",
        "",
        "Sapsuckers",
        "Open 7 Days: 12pm \u2013 10pm",
        "Friday & Saturday Late Night Happy Hour: 10pm \u2013 11pm",
        "",
        "Cafe Red",
        "Mon \u2013 Thu: 11am \u2013 9pm",
        "Friday: 11am \u2013 10pm",
        "Saturday: 10am \u2013 10pm",
        "Sunday: 10am \u2013 8pm",
        "",
        "When hours change, remember to also update your Google Business Profile and OpenTable availability.",
    ]),

    ("EDITING ABOUT SECTION TEXT", [
        ("bullet", "Click Site Content in the left sidebar"),
        ("bullet", "Select the restaurant"),
        ("bullet", "Edit the About Section Heading or About Section Body"),
        ("bullet", "The body field supports rich text \u2014 you can bold, italicize, and create paragraphs"),
        ("bullet", "Click Publish"),
    ]),

    ("POSTING ANNOUNCEMENTS AND EVENTS", [
        "To add an announcement banner (e.g., holiday closure):",
        ("bullet", "Click Site Content in the sidebar and select the restaurant"),
        ("bullet", "Fill in the Announcement Banner field"),
        ("bullet", "Click Publish"),
        ("bullet", "To remove the banner, clear the field and publish again"),
        "",
        "To add an event:",
        ("bullet", "Click Events in the sidebar, then click + Create"),
        ("bullet", "Fill in the title, date, description, and optionally an image"),
        ("bullet", "Click Publish"),
        ("bullet", "Past events should be manually unpublished or deleted when they are over"),
    ]),

    ("PHOTO GALLERY", [
        "Gallery photos can be updated through Sanity Studio:",
        ("bullet", "Click Gallery Sections in the sidebar"),
        ("bullet", "Select the gallery you want to update"),
        ("bullet", "Add, remove, or reorder photos"),
        ("bullet", "Click Publish"),
        "",
        "Photo tips:",
        ("bullet", "Landscape orientation works best for most placements"),
        ("bullet", "Minimum 1200px wide for sharp display on all devices"),
        ("bullet", "JPEG format is preferred (smaller file size, faster loading)"),
        ("bullet", "Natural lighting photographs best \u2014 avoid heavy filters"),
    ]),

    ("ONLINE ORDERING (MENUFY)", [
        "Your Menufy accounts handle online ordering. This is completely unchanged:",
        ("bullet", "Cafe Red: ordercafered.com"),
        ("bullet", "Sapsuckers: ordersapsuckers.com"),
        "",
        "When a customer clicks Order Online on your website, they go directly to your Menufy page. Any changes you make in Menufy take effect immediately on the ordering side.",
        "",
        "Note: Menufy and the website menu are separate systems. If you update a price in Menufy, you should also update it in Sanity so the website matches. Or contact Brooklyn Strategic and we can run the Menufy sync tool.",
    ]),

    ("RESERVATIONS (OPENTABLE)", [
        "OpenTable links are built into every page:",
        ("bullet", "Cafe Red: opentable.com/r/cafe-red-of-kings-park"),
        ("bullet", "Sapsuckers: opentable.com/r/sapsuckers-hops-and-grub-huntington"),
        "",
        "Manage your reservations, availability, and settings through OpenTable as you normally do. No changes needed on the website side.",
    ]),

    ("WHAT REQUIRES DEVELOPER HELP", [
        "These changes need Brooklyn Strategic to implement:",
        ("bullet", "Page structure changes \u2014 adding new pages or changing navigation"),
        ("bullet", "Design changes \u2014 colors, fonts, or layout modifications"),
        ("bullet", "New integrations \u2014 adding Instagram feeds, email signup forms, etc."),
        ("bullet", "Domain and hosting changes \u2014 DNS, SSL certificates, server configuration"),
    ]),

    ("QUICK REFERENCE", [
        ("bullet", "Change menu items or prices \u2192 Sanity Studio > Dishes"),
        ("bullet", "Update restaurant hours \u2192 Sanity Studio > Locations"),
        ("bullet", "Edit about section text \u2192 Sanity Studio > Site Content"),
        ("bullet", "Post an announcement banner \u2192 Sanity Studio > Site Content"),
        ("bullet", "Add an event \u2192 Sanity Studio > Events > + Create"),
        ("bullet", "Update gallery photos \u2192 Sanity Studio > Gallery Sections"),
        ("bullet", "Update online ordering \u2192 ordercafered.com / ordersapsuckers.com"),
        ("bullet", "Manage reservations \u2192 OpenTable"),
        ("bullet", "Something looks broken \u2192 Email Brooklyn Strategic"),
    ]),

    ("SUPPORT AND CONTACTS", [
        "Brooklyn Strategic (website developer)",
        "Andrew MacDowell",
        "andrew@brooklynstrategic.com",
        "347-581-5272",
        "",
        "Post-launch support: 30 days of support included from launch date. This covers bug fixes, minor content adjustments, and questions about using the CMS.",
        "",
        "After the support period: Content updates via Sanity are self-service at no cost. Design or structural changes can be arranged as needed.",
    ]),
]


def build_requests():
    """Build all batchUpdate requests for content + formatting."""
    reqs = []
    idx = 1  # Current insertion index

    # --- Step 1: Clear existing content ---
    # We'll get the doc length first and delete everything

    # --- Step 2: Insert all text first, then format ---
    # We need to track ranges for formatting

    text_parts = []  # (text, style_type, is_bullet, is_subbullet)

    # Title
    text_parts.append((TITLE_LINE + '\n', 'title', False, False))

    # Header fields
    for label, value in HEADER_FIELDS:
        text_parts.append((f'{label}\t{value}\n', 'header', False, False))

    # Horizontal rule placeholder (we'll add a bottom border to the last header paragraph)
    text_parts.append(('\n', 'spacer', False, False))

    # Sections
    for heading, paragraphs in SECTIONS:
        text_parts.append((heading + '\n', 'heading', False, False))
        for p in paragraphs:
            if isinstance(p, tuple):
                ptype = p[0]
                if ptype == 'bullet':
                    text_parts.append((p[1] + '\n', 'body', True, False))
                elif ptype == 'subbullet':
                    text_parts.append((p[1] + '\n', 'body', False, True))
            elif p == '':
                text_parts.append(('\n', 'spacer', False, False))
            else:
                text_parts.append((p + '\n', 'body', False, False))

    # Build full text and track ranges
    full_text = ''
    ranges = []  # (start, end, style_type, is_bullet, is_subbullet)

    for text, stype, is_bullet, is_subbullet in text_parts:
        start = len(full_text) + 1  # +1 for 1-indexed
        full_text += text
        end = len(full_text) + 1
        ranges.append((start, end, stype, is_bullet, is_subbullet))

    return full_text, ranges


def main():
    token = get_token('bstrat')

    # Get current doc length
    doc = api(f'https://docs.googleapis.com/v1/documents/{DOC_ID}', token)
    end_index = 1
    for element in doc.get('body', {}).get('content', []):
        if 'endIndex' in element:
            end_index = element['endIndex']

    requests = []

    # Delete existing content
    if end_index > 2:
        requests.append({
            'deleteContentRange': {
                'range': {'startIndex': 1, 'endIndex': end_index - 1}
            }
        })

    full_text, ranges = build_requests()

    # Insert all text at once
    requests.append({
        'insertText': {'location': {'index': 1}, 'text': full_text}
    })

    # Apply formatting to each range
    for start, end, stype, is_bullet, is_subbullet in ranges:
        if end <= start:
            continue

        if stype == 'title':
            requests.append({
                'updateTextStyle': {
                    'range': {'startIndex': start, 'endIndex': end},
                    'textStyle': title_style(),
                    'fields': 'weightedFontFamily,fontSize,bold,foregroundColor',
                }
            })
            requests.append({
                'updateParagraphStyle': {
                    'range': {'startIndex': start, 'endIndex': end},
                    'paragraphStyle': {
                        'namedStyleType': 'NORMAL_TEXT',
                        'lineSpacing': 115,
                    },
                    'fields': 'namedStyleType,lineSpacing',
                }
            })

        elif stype == 'header':
            requests.append({
                'updateTextStyle': {
                    'range': {'startIndex': start, 'endIndex': end},
                    'textStyle': header_label_style(),
                    'fields': 'weightedFontFamily,fontSize,bold,foregroundColor',
                }
            })
            requests.append({
                'updateParagraphStyle': {
                    'range': {'startIndex': start, 'endIndex': end},
                    'paragraphStyle': {
                        'namedStyleType': 'NORMAL_TEXT',
                        'lineSpacing': 115,
                    },
                    'fields': 'namedStyleType,lineSpacing',
                }
            })

        elif stype == 'heading':
            requests.append({
                'updateTextStyle': {
                    'range': {'startIndex': start, 'endIndex': end},
                    'textStyle': heading_style(),
                    'fields': 'weightedFontFamily,fontSize,bold,foregroundColor',
                }
            })
            requests.append({
                'updateParagraphStyle': {
                    'range': {'startIndex': start, 'endIndex': end},
                    'paragraphStyle': {
                        'namedStyleType': 'NORMAL_TEXT',
                        'lineSpacing': 115,
                        'spaceAbove': {'magnitude': 12, 'unit': 'PT'},
                    },
                    'fields': 'namedStyleType,lineSpacing,spaceAbove',
                }
            })

        elif stype == 'body':
            requests.append({
                'updateTextStyle': {
                    'range': {'startIndex': start, 'endIndex': end},
                    'textStyle': body_style(),
                    'fields': 'weightedFontFamily,fontSize,bold,foregroundColor',
                }
            })

            if is_bullet:
                requests.append({
                    'createParagraphBullets': {
                        'range': {'startIndex': start, 'endIndex': end},
                        'bulletPreset': 'BULLET_DISC_CIRCLE_SQUARE',
                    }
                })
                requests.append({
                    'updateParagraphStyle': {
                        'range': {'startIndex': start, 'endIndex': end},
                        'paragraphStyle': {
                            'indentFirstLine': {'magnitude': 9, 'unit': 'PT'},
                            'indentStart': {'magnitude': 22.5, 'unit': 'PT'},
                        },
                        'fields': 'indentFirstLine,indentStart',
                    }
                })

    # Add horizontal rule after the Subject line (border on 5th paragraph)
    # Find the Subject line range
    subject_range = None
    for start, end, stype, _, _ in ranges:
        if stype == 'header':
            subject_range = (start, end)  # Last header field = Subject
    
    if subject_range:
        requests.append({
            'updateParagraphStyle': {
                'range': {'startIndex': subject_range[0], 'endIndex': subject_range[1]},
                'paragraphStyle': {
                    'borderBottom': {
                        'color': {'color': {'rgbColor': BLACK}},
                        'width': {'magnitude': 0.5, 'unit': 'PT'},
                        'padding': {'magnitude': 6, 'unit': 'PT'},
                        'dashStyle': 'SOLID',
                    }
                },
                'fields': 'borderBottom',
            }
        })

    # Make org names italic in header fields
    # "Cafe Red & Sapsuckers" and "Brooklyn Strategic"
    for org_name in ['Cafe Red & Sapsuckers', 'Brooklyn Strategic']:
        pos = full_text.find(org_name)
        if pos >= 0:
            requests.append({
                'updateTextStyle': {
                    'range': {'startIndex': pos + 1, 'endIndex': pos + 1 + len(org_name)},
                    'textStyle': {'italic': True},
                    'fields': 'italic',
                }
            })

    # Execute
    print(f"Sending {len(requests)} requests...")
    result = api(
        f'https://docs.googleapis.com/v1/documents/{DOC_ID}:batchUpdate',
        token, method='POST', body={'requests': requests}
    )
    print(f"Done! Doc: https://docs.google.com/document/d/{DOC_ID}/edit")


if __name__ == '__main__':
    main()
