import Component from "../core/Component.js";

export default class Items extends Component {
    setup () {
        this.$state = { items: ["item1", "item2"] };
    }

    template () {
        const { items } = this.$state;
        return `
            <ul>
                ${items.map((item, key) => `
                    <li>
                        ${item}
                        <button class="deleteBtn" data-index="${key}">삭제</button>
                    </li>
                `).join("")}
            </ul>
            <button class="addBtn">추가</button>
        `
    }

    /* 
        이벤트 버블링을 사용한다. 
        모든 이벤트를 $target에 등록하여 사용하면 된다.
    */
    setEvent () {
        // this.$target.querySelector(".addBtn").addEventListener("click", () => {
        //     const { items } = this.$state;
        //     this.setState({ items: [ ...items, `item${items.length + 1}`]});
        // });
        
        // this.$target.querySelectorAll(".deleteBtn").forEach(deleteBtn => {
        //     deleteBtn.addEventListener("click", ({ target }) => {
        //         const items = [ ...this.$state.items ];
        //         items.splice(target.dataset.index, 1); // (item 버튼의 key 값을 이용하여) 삭제만 한다.
        //         this.setState({ items });
        //     })
        // })

        // event 객체의 target인, event.target을 매개변수로 받는다.
        this.addEvent("click", ".addBtn", ({ target }) => {
            const { items } = this.$state;
            this.setState({ items: [ ...items, `item${items.length + 1}`]});
        });

        this.addEvent("click", ".deleteBtn", ({ target }) => {
            const items = [ ...this.$state.items ];
            items.splice(target.dataset.index, 1);
            this.setState({ items }) 
        })
    }
}