export default class Component {
    $target;
    $state;

    constructor ($target) {
        this.$target = $target;
        this.setup();
        this.setEvent();
        this.render();
    }

    setup() {};

    template () { return ""; }

    render () {
        this.$target.innerHTML = this.template();
    }

    setEvent () {}

    setState (newState) {
        this.$state = { ...this.$state, ...newState };
        this.render();
    }

    // 이벤트 버블링을 통한 등록 과정을 
    // 메소드로 만들어서 사용한다. 
    addEvent (eventType, selector, callback) {
        const children = [ ...this.$target.querySelectorAll(selector)];
        // 이벤트가 발생한, event 객체의 target
        const isTarget = (target) => children.includes(target) 
                                     || target.closest(selector);

        this.$target.addEventListener(eventType, event => {
            if (!isTarget(event.target)) return false; //
            callback(event); //
        })
    }
}