export function searchOrders(orders, searchText) {
  if (!searchText || typeof searchText !== "string") return [];

  const lowerSearchText = searchText.toLowerCase();
  const upperSearchText = searchText.toUpperCase();

  return orders.filter((order) => {
    const searchableFields = [
      order.sirket_Ad,
      order.fatura_numarasi,
      order.musteri_bilgileri?.email,
      order.musteri_bilgileri?.phone,
      order.musteri_bilgileri?.companyname,
      order.urunInfo?.urunAdi,
      order.urunAdi,
      order.doviz,
    ];

    return searchableFields.some(
      (field) =>
        field?.toLowerCase().includes(lowerSearchText) ||
        field?.toUpperCase().includes(upperSearchText)
    );
  });
}
