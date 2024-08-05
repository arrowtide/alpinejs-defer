const Defer = (el, { value, modifiers, expression, original }, { effect, cleanup }) => {
    const initComponent = () => {
        queueMicrotask(() => {
            el.removeAttribute(original);

            delete el._x_ignore;

            Alpine.initTree(el);
        })
    }

    if (value == 'intersect') {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    observer.disconnect();
                    initComponent();
                }
            });
        });

        observer.observe(el);
    }

    if (value == 'event') {
        const doEvent = () => {
            initComponent();

            window.removeEventListener(expression, initComponent);
        }

        window.addEventListener(expression, doEvent, {once: true, passive: true})
    }

    if (value == 'interact') {
        new Promise(function(resolve, reject) {
            const events = ['touchstart', 'mousedown', 'mouseover', 'scroll', 'keydown'];

            const complete = () => {
                events.forEach((event) => {
                    window.removeEventListener(event, complete);
                });

                initComponent();

                resolve();
            }

            events.forEach((event) => {
                window.addEventListener(event, complete, { once: true, passive: true });
            })
        });
    }

    if (! value) {
        setTimeout(() => {
            initComponent();
        }, 0);
    }
};

Defer.inline = (el, { modifiers }, { cleanup }) => {
    el._x_ignore = true;

    cleanup(() => {
        delete el._x_ignore
    })
}


export default Defer;
