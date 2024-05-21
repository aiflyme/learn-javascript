export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0,
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499,
    },
    {
        id: '3',
        deliveryDays: 0,
        priceCents: 999,
    },
];

export function getDeliveryOption(deliveryOptionId) {
    for(let deliveryOption of deliveryOptions){
        if(deliveryOptionId === deliveryOption.id){
            return deliveryOption
        }
    }
    return false;
}
