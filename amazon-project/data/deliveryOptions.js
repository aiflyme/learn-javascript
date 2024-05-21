import  dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

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
        deliveryDays: 1,
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

export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();
    const deliverydays = skipWeekend(deliveryOption.deliveryDays)
    const deliveryDate = today.add(deliverydays, 'days');

    return deliveryDate.format('dddd, MMMM D');
}

function skipWeekend(deliveryDays) {
    const today = dayjs();
    let i = deliveryDays;
    let j = 1;
    while (i > 0){
        let dates = today.add(j, 'days');
        const weekday = Number(dates.format('d'));

        if(weekday === 0 || weekday === 6 ){
            deliveryDays++;
        }else{
            i--;
        }
        j++;
        //console.log(deliveryDays + '--' + i + '--' + weekday);
    }
    return deliveryDays;
}