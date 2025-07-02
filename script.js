const services = {
    hand: [
        {
            name: "Soft Gel",
            options: [
                { name: "不需卸甲", price: 150 },
                { name: "需卸甲", price: 200 }
            ],
            styles: [
                { name: "牆上/新色版/閃粉", price: 50 },
                { name: "貓眼", price: 80 },
                { name: "跳色", price: 30 },
                { name: "捽粉", price: 100 },
                { name: "有底色捽粉", price: 100, extra: [50, 30] },
                { name: "單色漸變", price: 80, note: "雙色漸變可能同價，需確認" },
                { name: "簡單畫花/貼紙", price: 10, per: "隻" },
                { name: "鑲石（細粒）", price: 3, per: "粒" }
            ],
            extras: [
                { name: "浸手修手", price: 100 },
                { name: "延長（僅Hard Gel）", price: 10, per: "隻" }
            ]
        },
        {
            name: "Hard Gel",
            options: [
                { name: "不需卸甲", price: 188 },
                { name: "需卸甲", price: 218 }
            ],
            styles: [...services.hand[0].styles],
            extras: [...services.hand[0].extras]
        },
        { name: "無Gel純浸水修手", price: 80 },
        { name: "無浸水修手/卸甲後護理", price: 80 },
        { name: "純卸甲", price: 80 },
        {
            name: "補甲",
            options: [
                { name: "7日內免費", price: 0 },
                { name: "超過7日（本店）", price: 30, per: "隻" },
                { name: "超過7日（非本店）", price: 50, per: "隻" }
            ]
        }
    ],
    foot: [
        {
            name: "Soft Gel",
            options: [
                { name: "不需卸甲（單色）", price: 188 },
                { name: "需卸甲（單色）", price: 238 }
            ],
            styles: [...services.hand[0].styles],
            extras: [{ name: "浸腳修腳", price: 100 }]
        },
        {
            name: "Hard Gel",
            options: [{ name: "單色（不論卸甲）", price: 258 }],
            styles: [...services.hand[0].styles],
            extras: [{ name: "浸腳修腳", price: 100 }, { name: "延長", price: 10, per: "隻" }]
        },
        { name: "無Gel純浸水修腳", price: 198 },
        { name: "無浸水修腳/卸甲後護理", price: 120 },
        { name: "純卸甲", price: 100 },
        {
            name: "補甲",
            options: [
                { name: "7日內免費", price: 0 },
                { name: "超過7日（本店）", price: 30, per: "隻" },
                { name: "超過7日（非本店）", price: 50, per: "隻" }
            ]
        }
    ],
    eyelash: [
        { name: "自然款", price: 368 },
        { name: "濃密款", price: 468 },
        { name: "尊貴款", price: 568 },
        { name: "套票用戶", price: 0, note: "需在簿冊簽名" },
        { name: "補睫", price: 298 },
        { name: "純卸睫", price: 150 },
        { name: "10日內補睫", price: 0, note: "限1次" }
    ]
};

let order = [];
let totalPrice = 0;

function showCategory(category) {
    const content = document.getElementById("category-content");
    content.innerHTML = `<h2>${category === "hand" ? "手部服務" : category === "foot" ? "足部服務" : "眼睫毛服務"}</h2>`;
    services[category].forEach(service => {
        const div = document.createElement("div");
        div.className = "service-item";
        div.innerHTML = `<h3>${service.name}</h3>`;
        if (service.options) {
            service.options.forEach(option => {
                div.innerHTML += `<button onclick="addToOrder('${category}', '${service.name}', '${option.name}', ${option.price}, '${option.note || ""}', '${option.per || ""}')">${option.name} $${option.price}${option.per ? "/" + option.per : ""}${option.note ? " (" + option.note + ")" : ""}</button>`;
            });
        } else {
            div.innerHTML += `<button onclick="addToOrder('${category}', '${service.name}', '${service.name}', ${service.price}, '${service.note || ""}')">${service.name} $${service.price}${service.note ? " (" + service.note + ")" : ""}</button>`;
        }
        // 款式與額外選項
        if (service.styles) {
            div.innerHTML += `<h4>款式</h4>`;
            service.styles.forEach(style => {
                div.innerHTML += `<button onclick="addToOrder('${category}', '${service.name} 款式', '${style.name}', ${style.price}, '${style.note || ""}', '${style.per || ""}')">${style.name} +$${style.price}${style.per ? "/" + style.per : ""}${style.note ? " (" + style.note + ")" : ""}</button>`;
            });
        }
        if (service.extras) {
            div.innerHTML += `<h4>額外選項</h4>`;
            service.extras.forEach(extra => {
                div.innerHTML += `<button onclick="addToOrder('${category}', '${service.name} 額外', '${extra.name}', ${extra.price}, '', '${extra.per || ""}')">${extra.name} +$${extra.price}${extra.per ? "/" + extra.per : ""}</button>`;
            });
        }
        content.appendChild(div);
    });
}

function addToOrder(category, service, option, price, note, per) {
    order.push({ category, service, option, price, note, per });
    totalPrice += price;
    updateOrderList();
}

function updateOrderList() {
    const orderList = document.getElementById("order-list");
    orderList.innerHTML = "";
    order.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.service} - ${item.option} $${item.price}${item.per ? "/" + item.per : ""}${item.note ? " (" + item.note + ")" : ""}`;
        orderList.appendChild(li);
    });
    document.getElementById("total-price").textContent = totalPrice;
}

function clearOrder() {
    order = [];
    totalPrice = 0;
    updateOrderList();
}

// 初始化
showCategory("hand");
