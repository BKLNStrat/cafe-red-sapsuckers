#!/usr/bin/env python3
"""Rewrite the CMS Guide doc with simplified language, accurate info, and real hyperlinks."""

import json, urllib.request, urllib.error, os

TOKEN_DIR = os.path.expanduser('~/.clawdbot/google-tokens')
DOC_ID = '1I6uF64Br4d-tBRes5_FdsRqhgP0q-W_I3zED5cHK8c0'

def get_token(account):
    with open(f'{TOKEN_DIR}/{account}.json') as f:
        data = json.load(f)
    return data.get('access_token', data.get('token'))

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
        raise

BLUE = {'red': 0, 'green': 0.4392157, 'blue': 0.7529412}
BLACK = {'red': 0, 'green': 0, 'blue': 0}

# Content structure: list of (type, text, [url_for_links])
# Types: title, header, heading, body, bullet, spacer, link_bullet
CONTENT = [
    ('title', 'WEBSITE MANAGEMENT GUIDE'),
    ('header', 'To:\tKelley Danek, Cafe Red & Sapsuckers'),
    ('header', 'From:\tAndrew MacDowell, Brooklyn Strategic'),
    ('header', 'Date:\tMarch 2026'),
    ('header', 'Subject:\tHow to Manage Your New Websites'),

    ('heading', 'WHAT THIS GUIDE COVERS'),
    ('body', 'Your new websites for Cafe Red and Sapsuckers come with a simple dashboard where you can make changes yourself \u2014 no coding, no technical skills needed. This guide walks you through everything you can do on your own.'),
    ('spacer', ''),
    ('body', 'Your online ordering (Menufy) and reservations (OpenTable) work exactly the same as before. Nothing has changed with those systems.'),

    ('heading', 'HOW TO LOG IN'),
    ('body', 'You will receive an email invitation from Sanity (the dashboard system) at your email address. Here is what to do:'),
    ('spacer', ''),
    ('bullet', 'Open the invitation email and click the link'),
    ('bullet', 'Create your account using Google sign-in (easiest) or a username and password'),
    ('bullet', 'Once your account is created, go to your dashboard:'),
    ('link_line', 'http://104.236.69.208:3333/', 'http://104.236.69.208:3333/'),
    ('spacer', ''),
    ('body', 'Bookmark that link. It is your dashboard for both restaurants. After the domains are pointed to the new server, this address will change to something cleaner \u2014 we will update this guide when that happens.'),
    ('spacer', ''),
    ('body', 'If you ever see "You are not authorized," make sure you are signed in with the same email that received the invitation. If it still does not work, reach out to Brooklyn Strategic.'),

    ('heading', 'HOW TO CHANGE MENU ITEMS OR PRICES'),
    ('body', 'To edit a dish that is already on the menu:'),
    ('bullet', 'Click "Dishes" on the left side of the dashboard'),
    ('bullet', 'Click the dish you want to change'),
    ('bullet', 'Update the name, price, or description'),
    ('bullet', 'Click the green "Publish" button in the bottom-right corner'),
    ('spacer', ''),
    ('body', 'To add a new dish:'),
    ('bullet', 'Click "Dishes" on the left, then click "+ Create"'),
    ('bullet', 'Choose which restaurant it belongs to (Sapsuckers or Cafe Red)'),
    ('bullet', 'Fill in the name and price'),
    ('bullet', 'Click "Publish"'),
    ('bullet', 'Then go to "Menu Sections," find the right section (like "Appetizers"), and drag the new dish into the list'),
    ('spacer', ''),
    ('body', 'To remove a dish:'),
    ('bullet', 'Find it in "Dishes"'),
    ('bullet', 'Click the three-dot menu in the top-right and choose "Delete" or "Unpublish" (which hides it without deleting)'),
    ('spacer', ''),
    ('body', 'To change the order dishes appear in: In "Menu Sections," you can drag dishes up or down within a section. To change the order of entire sections (like putting "Specials" above "Appetizers"), change the "Sort Order" number \u2014 lower numbers appear first.'),
    ('spacer', ''),
    ('body', 'Important: If you also change prices in Menufy (for online ordering), update them in the dashboard too so your website matches. These are two separate systems.'),

    ('heading', 'HOW TO UPDATE HOURS'),
    ('bullet', 'Click "Locations" on the left side of the dashboard'),
    ('bullet', 'Click the restaurant you want to update'),
    ('bullet', 'Edit the hours'),
    ('bullet', 'Click "Publish"'),
    ('spacer', ''),
    ('body', 'Remember to also update your hours on Google Business Profile and OpenTable when they change.'),

    ('heading', 'HOW TO CHANGE THE ABOUT SECTION'),
    ('bullet', 'Click "Site Content" on the left'),
    ('bullet', 'Click the restaurant you want to update'),
    ('bullet', 'Edit the "About Section" text'),
    ('bullet', 'Click "Publish"'),

    ('heading', 'HOW TO POST AN ANNOUNCEMENT'),
    ('body', 'You can add a banner across the top of the website for things like holiday closures, special events, or seasonal hours.'),
    ('spacer', ''),
    ('bullet', 'Click "Site Content" on the left'),
    ('bullet', 'Click the restaurant'),
    ('bullet', 'Type your message in the "Announcement Banner" field'),
    ('bullet', 'Click "Publish"'),
    ('spacer', ''),
    ('body', 'To remove the banner, just clear that field and publish again.'),

    ('heading', 'HOW TO ADD AN EVENT'),
    ('bullet', 'Click "Events" on the left, then "+ Create"'),
    ('bullet', 'Fill in the title, date, and a short description'),
    ('bullet', 'Add a photo if you have one (optional)'),
    ('bullet', 'Click "Publish"'),
    ('spacer', ''),
    ('body', 'When the event is over, come back and delete it or click "Unpublish" to hide it.'),

    ('heading', 'HOW TO UPDATE PHOTOS'),
    ('bullet', 'Click "Gallery Sections" on the left'),
    ('bullet', 'Click the gallery you want to update'),
    ('bullet', 'Add, remove, or drag photos to reorder them'),
    ('bullet', 'Click "Publish"'),
    ('spacer', ''),
    ('body', 'Photos look best in landscape orientation (wider than tall), at least 1200 pixels wide, in JPEG format.'),

    ('heading', 'HOW TO SYNC YOUR MENU FROM MENUFY'),
    ('body', 'If you update your menu on Menufy (for online ordering) and want the website to match, you can pull those changes in automatically.'),
    ('spacer', ''),
    ('bullet', 'In the dashboard, click "Sync from Menufy" in the left sidebar'),
    ('bullet', 'Click the button for whichever restaurant you want to sync (or "Sync Both")'),
    ('bullet', 'Wait about 15 seconds while it reads your Menufy menu'),
    ('bullet', 'You will see a summary of what changed \u2014 new items, updated prices, etc.'),
    ('bullet', 'Changes are saved as drafts. Go to "Dishes" to review them and click "Publish" on each one you want to keep'),
    ('spacer', ''),
    ('body', 'This does not change anything on Menufy itself. It only copies data from Menufy into your website dashboard. You are always in control of what gets published to the website.'),

    ('heading', 'ONLINE ORDERING AND RESERVATIONS'),
    ('body', 'These systems are completely separate from the website and work exactly as they did before:'),
    ('spacer', ''),
    ('body', 'Online ordering (Menufy):'),
    ('link_bullet', 'Cafe Red: ordercafered.com', 'https://www.ordercafered.com/'),
    ('link_bullet', 'Sapsuckers: ordersapsuckers.com', 'https://www.ordersapsuckers.com/'),
    ('spacer', ''),
    ('body', 'Reservations (OpenTable):'),
    ('link_bullet', 'Cafe Red on OpenTable', 'https://www.opentable.com/r/cafe-red-of-kings-park'),
    ('link_bullet', 'Sapsuckers on OpenTable', 'https://www.opentable.com/r/sapsuckers-hops-and-grub-huntington'),
    ('spacer', ''),
    ('body', 'When customers click "Order Online" or "Make a Reservation" on your website, they are taken directly to these pages.'),

    ('heading', 'WHAT REQUIRES BROOKLYN STRATEGIC'),
    ('body', 'Most day-to-day updates you can handle yourself using the dashboard. The following changes need us to step in:'),
    ('spacer', ''),
    ('bullet', 'Adding or removing entire pages from the website'),
    ('bullet', 'Changing the design \u2014 colors, fonts, or layout'),
    ('bullet', 'Adding new features like Instagram feeds, email signup forms, or gift card integration'),
    ('bullet', 'Domain changes, SSL certificates, or server configuration'),

    ('heading', 'ONGOING SUPPORT AND MAINTENANCE'),
    ('body', 'Your project includes 60 days of post-launch support at no additional cost. During this period, we handle bug fixes, content adjustments, and any questions about using the dashboard.'),
    ('spacer', ''),
    ('body', 'After the 60-day support period, ongoing maintenance is available:'),
    ('spacer', ''),
    ('body', 'Investment: $100 per month (or $75 per month with automated payments)'),
    ('spacer', ''),
    ('body', 'This covers:'),
    ('bullet', 'Managed hosting with daily backups'),
    ('bullet', 'Security monitoring and software updates'),
    ('bullet', 'Up to 2 hours of revisions per month'),
    ('bullet', 'Priority support response'),
    ('spacer', ''),
    ('body', 'Maintenance is optional. Even without it, you can always update content through the dashboard at no cost. The maintenance plan is for when you need design changes, new features, or want us handling the hosting and security for you.'),

    ('heading', 'QUICK REFERENCE'),
    ('bullet', 'Change menu items or prices \u2192 Dashboard > Dishes'),
    ('bullet', 'Update hours \u2192 Dashboard > Locations'),
    ('bullet', 'Edit the about section \u2192 Dashboard > Site Content'),
    ('bullet', 'Post an announcement \u2192 Dashboard > Site Content > Announcement Banner'),
    ('bullet', 'Add an event \u2192 Dashboard > Events > + Create'),
    ('bullet', 'Update photos \u2192 Dashboard > Gallery Sections'),
    ('bullet', 'Sync menu from Menufy \u2192 Dashboard > Sync from Menufy'),
    ('bullet', 'Online ordering \u2192 ordercafered.com / ordersapsuckers.com'),
    ('bullet', 'Reservations \u2192 OpenTable'),
    ('bullet', 'Need help \u2192 Email or call Brooklyn Strategic'),

    ('heading', 'CONTACT'),
    ('body', 'Andrew MacDowell'),
    ('body', 'Brooklyn Strategic'),
    ('link_line', 'andrew@brooklynstrategic.com', 'mailto:andrew@brooklynstrategic.com'),
    ('body', '347-581-5272'),
]

def main():
    token = get_token('bstrat')

    # Get current doc length
    doc = api(f'https://docs.googleapis.com/v1/documents/{DOC_ID}', token)
    end_index = doc['body']['content'][-1]['endIndex']

    requests = []

    # Delete existing content
    if end_index > 2:
        requests.append({
            'deleteContentRange': {
                'range': {'startIndex': 1, 'endIndex': end_index - 1}
            }
        })

    # Build full text
    full_text = ''
    ranges = []  # (start, end, type, url_or_none)
    
    for item in CONTENT:
        itype = item[0]
        text = item[1]
        url = item[2] if len(item) > 2 else None
        
        if itype == 'spacer':
            start = len(full_text) + 1
            full_text += '\n'
            end = len(full_text) + 1
            ranges.append((start, end, 'spacer', None))
            continue

        start = len(full_text) + 1
        full_text += text + '\n'
        end = len(full_text) + 1
        ranges.append((start, end, itype, url))

    # Insert all text
    requests.append({
        'insertText': {'location': {'index': 1}, 'text': full_text}
    })

    # Apply Calibri 11pt to everything first
    total_end = len(full_text) + 1
    requests.append({
        'updateTextStyle': {
            'range': {'startIndex': 1, 'endIndex': total_end},
            'textStyle': {
                'weightedFontFamily': {'fontFamily': 'Calibri', 'weight': 400},
                'fontSize': {'magnitude': 11, 'unit': 'PT'},
                'bold': False,
                'foregroundColor': {'color': {'rgbColor': BLACK}},
            },
            'fields': 'weightedFontFamily,fontSize,bold,foregroundColor',
        }
    })

    # Track subject line for border
    subject_range = None

    for start, end, itype, url in ranges:
        if end <= start:
            continue

        if itype == 'title':
            requests.append({
                'updateTextStyle': {
                    'range': {'startIndex': start, 'endIndex': end},
                    'textStyle': {
                        'weightedFontFamily': {'fontFamily': 'Lato', 'weight': 700},
                        'fontSize': {'magnitude': 10.5, 'unit': 'PT'},
                        'bold': True,
                    },
                    'fields': 'weightedFontFamily,fontSize,bold',
                }
            })

        elif itype == 'header':
            requests.append({
                'updateTextStyle': {
                    'range': {'startIndex': start, 'endIndex': end},
                    'textStyle': {
                        'weightedFontFamily': {'fontFamily': 'Lato', 'weight': 400},
                        'fontSize': {'magnitude': 10.5, 'unit': 'PT'},
                    },
                    'fields': 'weightedFontFamily,fontSize',
                }
            })
            requests.append({
                'updateParagraphStyle': {
                    'range': {'startIndex': start, 'endIndex': end},
                    'paragraphStyle': {'lineSpacing': 115},
                    'fields': 'lineSpacing',
                }
            })
            if 'Subject:' in CONTENT[[r[2] for r in ranges].index(itype)][1] if False else '':
                pass
            # Track last header as subject
            subject_range = (start, end)

        elif itype == 'heading':
            requests.append({
                'updateTextStyle': {
                    'range': {'startIndex': start, 'endIndex': end},
                    'textStyle': {
                        'bold': True,
                        'foregroundColor': {'color': {'rgbColor': BLUE}},
                    },
                    'fields': 'bold,foregroundColor',
                }
            })
            requests.append({
                'updateParagraphStyle': {
                    'range': {'startIndex': start, 'endIndex': end},
                    'paragraphStyle': {
                        'spaceAbove': {'magnitude': 14, 'unit': 'PT'},
                    },
                    'fields': 'spaceAbove',
                }
            })

        elif itype in ('bullet', 'link_bullet'):
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
            if itype == 'link_bullet' and url:
                # Find the text to link
                text = full_text[start-1:end-2]  # -1 for 0-index, -2 to exclude newline
                requests.append({
                    'updateTextStyle': {
                        'range': {'startIndex': start, 'endIndex': end - 1},
                        'textStyle': {
                            'link': {'url': url},
                            'foregroundColor': {'color': {'rgbColor': {'red': 0.07, 'green': 0.33, 'blue': 0.8}}},
                            'underline': True,
                        },
                        'fields': 'link,foregroundColor,underline',
                    }
                })

        elif itype == 'link_line':
            if url:
                requests.append({
                    'updateTextStyle': {
                        'range': {'startIndex': start, 'endIndex': end - 1},
                        'textStyle': {
                            'link': {'url': url},
                            'foregroundColor': {'color': {'rgbColor': {'red': 0.07, 'green': 0.33, 'blue': 0.8}}},
                            'underline': True,
                        },
                        'fields': 'link,foregroundColor,underline',
                    }
                })

    # Add border after Subject line
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

    # Italicize org names
    for org in ['Cafe Red & Sapsuckers', 'Brooklyn Strategic']:
        idx = full_text.find(org)
        if idx >= 0:
            requests.append({
                'updateTextStyle': {
                    'range': {'startIndex': idx + 1, 'endIndex': idx + 1 + len(org)},
                    'textStyle': {'italic': True},
                    'fields': 'italic',
                }
            })

    print(f"Sending {len(requests)} requests...")
    api(f'https://docs.googleapis.com/v1/documents/{DOC_ID}:batchUpdate',
        token, method='POST', body={'requests': requests})
    print(f"Done! https://docs.google.com/document/d/{DOC_ID}/edit")


if __name__ == '__main__':
    main()
