class MapLibreThemeSelector {

    constructor(options) {
        options = Object.assign({}, options);


        if (!(this instanceof MapLibreThemeSelector)) {
            throw new Error('Instantiation Error: MapLibreThemeSelector needs to be called with the new keyword.');
        }

        // Variables
        this.currentTheme = "";
        this.themes = options.themes;

        // Methods
        this.setTheme = this.setTheme.bind(this);
        this.selectLanguage = this.selectLanguage.bind(this);
        this.updateTheme = this.updateTheme.bind(this);
        this.addSelector = this.addSelector.bind(this);

    }

    setTheme(theme) {
        this.currentTheme = themes[theme];
        updateTheme();
    }

    selectLanguage() {
        this.setTheme(document.querySelector('.theme-selector').value);
    }

    updateTheme() {
        this._map.setStyle(this.currentTheme);
    }

    addSelector() {
        let select = document.createElement('select');
        select.className = 'theme-selector';

        for (const [key, value] of Object.entries(this.themes)) {
            select.appendChild(new Option(key, value, false, this.currentTheme == key))
        }

        return select;
    }

    onAdd(map) {
        this._map = map;

        this._select = this.addSelector();
        this._select.addEventListener('change', this.updateTheme);

        return this._select;
    }

    onRemove() {
        this._select.parentNode.removeChild(this._container);
        this.map = undefined;
    }
}