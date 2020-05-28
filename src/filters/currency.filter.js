export default function currencyFilter(val, currency = "KZT") {
    return Intl.NumberFormat("ru-Ru", {
        style: "currency",
        currency,
    }).format(val);
}
