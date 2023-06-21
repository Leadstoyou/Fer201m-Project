import db from './database.json'


export default function LoadData(){
    localStorage.setItem("users", JSON.stringify(db.users));
    localStorage.setItem("products", JSON.stringify(db.products));
    localStorage.setItem("categories", JSON.stringify(db.categories));
    localStorage.setItem("carts", JSON.stringify(db.carts));
    localStorage.setItem("orders", JSON.stringify(db.orders));
};