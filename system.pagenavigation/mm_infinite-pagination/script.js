class InifinitePagination {
    #isLoading;
    #initialInfinitePaginationButton;
    #infinitePaginationButtonCSSId;

    constructor(
        elementsList,
        itemCSSSelector,
        callback = null,
        appendHiddenRender = document.getElementById("infinite-pagination-render-block") || null,
    ) {
        if (!elementsList) return;

        if (typeof elementsList === "string") {
            this.list = document.querySelector(elementsList)
        }
        else if (typeof elementsList === "object" && elementsList.classList) {
            this.list = elementsList;
        }
        else {
            const error = "Неверный тип аргумента";
            throw error;
        }

        this.callback = callback;

        this.itemsSelector = itemCSSSelector;

        if (appendHiddenRender) {
            if (typeof appendHiddenRender === "string") {
                this.hiddenRenderBlock = document.querySelector(appendHiddenRender);
            }
            else if (typeof appendHiddenRender === "object" && appendHiddenRender.classList) {
                this.hiddenRenderBlock = appendHiddenRender;
            }
            else {
                const error = "Неверный тип аргумента";
                throw error;
            }
        }

        this.isLoading = false;
        this.infinitePaginationButtonCSSId = "infinity-next-page"
        this.initialInfinitePaginationButton = document.getElementById(this.infinitePaginationButtonCSSId);

        this.onButtonClick = this.onButtonClick.bind(this);
    }

    // infinitePaginationButtonCSSId
    get infinitePaginationButtonCSSId() {
        return this.#infinitePaginationButtonCSSId;
    }
    set infinitePaginationButtonCSSId(value) {
        this.#infinitePaginationButtonCSSId = value;
    }

    // initialInfinitePaginationButton
    get initialInfinitePaginationButton() {
        return this.#initialInfinitePaginationButton;
    }
    set initialInfinitePaginationButton(value) {
        this.#initialInfinitePaginationButton = value;
    }

    // isLoading
    get isLoading() {
        return this.#isLoading;
    }

    set isLoading(value) {
        this.#isLoading = value;
    }

    init () {
        if (this.initialInfinitePaginationButton) {
            this.initialInfinitePaginationButton.addEventListener("click", this.onButtonClick);
        }
    }

    onButtonClick(event) {
        // this = object context because of bind in constructor

        event.preventDefault();

        const url = event.currentTarget.getAttribute("href");

        this.isLoading = false;

        if (this.isLoading) return;

        const response = fetch(`${url}&is_ajax=y`);

        response.then(res => res.text())
            .then(data => {
                this.isLoading = false;

                let renderHTMLString = data;

                this.hiddenRenderBlock.insertAdjacentHTML("beforeend", renderHTMLString);

                const newBtn = this.hiddenRenderBlock.querySelector(`#${this.infinitePaginationButtonCSSId}`);

                if (!newBtn) {
                    this.initialInfinitePaginationButton.classList.add("hidden");
                }
                else {
                    const newPaginationHref = newBtn.getAttribute("href");
                    this.initialInfinitePaginationButton.setAttribute("href", newPaginationHref);
                }

                const nedeedElements = this.hiddenRenderBlock.querySelectorAll(this.itemsSelector);

                nedeedElements.forEach(elem => {
                    this.list.appendChild(elem)
                })

                if (this.callback !== null && typeof(this.callback) === "function") {
                    this.callback();
                }


                this.hiddenRenderBlock.innerHTML = "";
            })
            .finally(data => {
                this.isLoading = false;
            });
    }
}