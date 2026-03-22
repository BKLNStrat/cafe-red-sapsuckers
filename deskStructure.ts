import type { StructureBuilder } from 'sanity/structure'

/**
 * Custom desk structure: content split by restaurant.
 *
 *  CAFE RED
 *    Location & Hours   (singleton)
 *    Site Content        (singleton)
 *    Dishes              (filtered)
 *    Menu Sections       (filtered, sorted)
 *    Prix Fixe Menu      (singleton)
 *    Gallery             (filtered)
 *    Party Menus         (filtered)
 *    Events              (filtered)
 *    FAQ                 (filtered)
 *
 *  SAPSUCKERS
 *    Location & Hours   (singleton)
 *    Site Content        (singleton)
 *    Dishes              (filtered)
 *    Menu Sections       (filtered, sorted)
 *    Happy Hour Menu     (singleton)
 *    Gallery             (filtered)
 *    Events              (filtered)
 *    FAQ                 (filtered)
 */

function restaurantGroup(
  S: StructureBuilder,
  key: 'cafe-red' | 'sapsuckers',
  label: string,
  opts: { includePartyMenus?: boolean; includePrixFixe?: boolean; includeHappyHour?: boolean } = {}
) {
  const items = [
    // Singleton: Location
    S.listItem()
      .title('Location & Hours')
      .id(`${key}-location`)
      .child(
        S.document()
          .schemaType('location')
          .documentId(`location-${key}`)
          .title(`${label} — Location & Hours`)
      ),

    // Singleton: Site Content
    S.listItem()
      .title('Site Content')
      .id(`${key}-siteContent`)
      .child(
        S.document()
          .schemaType('siteContent')
          .documentId(`content-${key}`)
          .title(`${label} — Site Content`)
      ),

    S.divider(),

    // Dishes (filtered)
    S.listItem()
      .title('Dishes')
      .id(`${key}-dishes`)
      .child(
        S.documentTypeList('dish')
          .title(`${label} — Dishes`)
          .filter('_type == "dish" && restaurant == $restaurant')
          .params({ restaurant: key })
          .initialValueTemplates([
            S.initialValueTemplateItem('dish-for-restaurant', { restaurant: key }),
          ])
      ),

    // Menu Sections (filtered, default sort by sortOrder)
    S.listItem()
      .title('Menu Sections')
      .id(`${key}-menuSections`)
      .child(
        S.documentTypeList('menuSection')
          .title(`${label} — Menu Sections`)
          .filter('_type == "menuSection" && restaurant == $restaurant')
          .params({ restaurant: key })
          .defaultOrdering([{ field: 'sortOrder', direction: 'asc' }])
          .initialValueTemplates([
            S.initialValueTemplateItem('menuSection-for-restaurant', { restaurant: key }),
          ])
      ),

    // Gallery (filtered)
    S.listItem()
      .title('Gallery')
      .id(`${key}-gallery`)
      .child(
        S.documentTypeList('gallerySection')
          .title(`${label} — Gallery`)
          .filter('_type == "gallerySection" && restaurant == $restaurant')
          .params({ restaurant: key })
          .initialValueTemplates([
            S.initialValueTemplateItem('gallerySection-for-restaurant', { restaurant: key }),
          ])
      ),
  ]

  // Prix Fixe Menu (Cafe Red)
  if (opts.includePrixFixe) {
    items.push(
      S.listItem()
        .title('Prix Fixe Menu')
        .id(`${key}-prixFixe`)
        .child(
          S.document()
            .schemaType('prixFixeMenu')
            .documentId(`prixfixe-${key}`)
            .title(`${label} — Prix Fixe Menu`)
        )
    )
  }

  // Happy Hour Menu (Sapsuckers)
  if (opts.includeHappyHour) {
    items.push(
      S.listItem()
        .title('Happy Hour Menu')
        .id(`${key}-happyHour`)
        .child(
          S.document()
            .schemaType('happyHourMenu')
            .documentId(`happyhour-${key}`)
            .title(`${label} — Happy Hour Menu`)
        )
    )
  }

  // Party Menus (Cafe Red only)
  if (opts.includePartyMenus) {
    items.push(
      S.listItem()
        .title('Party Menus')
        .id(`${key}-partyMenus`)
        .child(
          S.documentTypeList('partyMenu')
            .title(`${label} — Party Menus`)
            .filter('_type == "partyMenu" && restaurant == $restaurant')
            .params({ restaurant: key })
            .initialValueTemplates([
              S.initialValueTemplateItem('partyMenu-for-restaurant', { restaurant: key }),
            ])
        )
    )
  }

  items.push(
    // Events (filtered)
    S.listItem()
      .title('Events')
      .id(`${key}-events`)
      .child(
        S.documentTypeList('event')
          .title(`${label} — Events`)
          .filter('_type == "event" && restaurant == $restaurant')
          .params({ restaurant: key })
          .defaultOrdering([{ field: 'date', direction: 'asc' }])
          .initialValueTemplates([
            S.initialValueTemplateItem('event-for-restaurant', { restaurant: key }),
          ])
      ),

    // FAQ (filtered)
    S.listItem()
      .title('FAQ')
      .id(`${key}-faq`)
      .child(
        S.documentTypeList('faq')
          .title(`${label} — FAQ`)
          .filter('_type == "faq" && restaurant == $restaurant')
          .params({ restaurant: key })
          .defaultOrdering([{ field: 'sortOrder', direction: 'asc' }])
          .initialValueTemplates([
            S.initialValueTemplateItem('faq-for-restaurant', { restaurant: key }),
          ])
      ),
  )

  return S.listItem()
    .title(label)
    .id(key)
    .child(
      S.list()
        .title(label)
        .items(items)
    )
}

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      restaurantGroup(S, 'cafe-red', 'Cafe Red', { includePartyMenus: true, includePrixFixe: true }),
      restaurantGroup(S, 'sapsuckers', 'Sapsuckers', { includeHappyHour: true }),
    ])
