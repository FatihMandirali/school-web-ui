const localizedTextsMap = {
  columnMenuUnsort: "Listele",
  columnMenuSortAsc: "Küçükten Büyüğe",
  columnMenuSortDesc: "Büyükten Küçüğe",
  columnMenuFilter: "Filtrele",
  columnMenuHideColumn: "Gizle",
  columnMenuShowColumns: "Sütunları Göster",
  // Columns panel text
  columnsPanelTextFieldLabel: "Sütun Bul",
  columnsPanelTextFieldPlaceholder: "Sütun Başlık",
  columnsPanelDragIconLabel: "Reorder column",
  columnsPanelShowAllButton: "Tümünü Göster",
  columnsPanelHideAllButton: "Tümünü GİZLE",

  // Filter panel text
  filterPanelAddFilter: "Add filter",
  filterPanelDeleteIconLabel: "Delete",
  filterPanelLinkOperator: "Logic operator",
  filterPanelOperators: "İşlev",
  filterPanelOperatorAnd: "And",
  filterPanelOperatorOr: "Or",
  filterPanelColumns: "Sütun",
  filterPanelInputLabel: "Değer",
  filterPanelInputPlaceholder: "Değer Gir..",

  // Filter operators text
  filterOperatorContains: "içeren değer",
  filterOperatorEquals: "eşit değer",
  filterOperatorStartsWith: "ile başlayan",
  filterOperatorEndsWith: "ile biten",
  filterOperatorIs: "getir",
  filterOperatorNot: "is not",
  filterOperatorAfter: "is after",
  filterOperatorOnOrAfter: "is on or after",
  filterOperatorBefore: "is before",
  filterOperatorOnOrBefore: "is on or before",
  filterOperatorIsEmpty: "boş değer",
  filterOperatorIsNotEmpty: "dolu değer",
  filterOperatorIsAnyOf: "içeren değerler",

  // Column header text
  columnHeaderFiltersTooltipActive: (count) =>
    count !== 1 ? `${count} active filters` : `${count} active filter`,
  columnHeaderFiltersLabel: "Show filters",
  columnHeaderSortIconLabel: "Hizala",

  // Column menu text
  columnMenuLabel: "Menü",

  // Total row amount footer text
  footerTotalRows: "Toplam Satır:",

  // Total visible row amount footer text
  footerTotalVisibleRows: (visibleCount, totalCount) =>
    `${visibleCount.toLocaleString()} in ${totalCount.toLocaleString()}`,

  // Rows selected footer text
  footerRowSelected: (count) => `${count.toLocaleString()} satır seçildi`,
  // Root
  noRowsLabel: "Satır yok",
  noResultsOverlayLabel: "Sonuç bulunamadı.",
  errorOverlayDefaultLabel: "Beklenmeyen bir hata oluştu",

  // Filter values text
  filterValueAny: "Hepsi",
  filterValueTrue: "Aktif",
  filterValueFalse: "Pasif",

  toolbarFilters: "FİLTRE",
  toolbarColumns: "Sütunlar",

  // Density selector toolbar button text
  toolbarDensity: "Görünüm",
  toolbarDensityLabel: "Görünüm",
  toolbarDensityCompact: "Küçük",
  toolbarDensityStandard: "Orta",
  toolbarDensityComfortable: "Büyük",
};

export default localizedTextsMap;
