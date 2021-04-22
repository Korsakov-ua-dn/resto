export default class RestoService {
    async getMenuItems() {
        const res = await fetch('http://localhost:3004/menu');
        return res.json();
    }
}