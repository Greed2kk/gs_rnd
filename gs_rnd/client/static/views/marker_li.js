import {
    View,
    CollectionView
} from "backbone.marionette";
import _ from "underscore";
import markerList from "../../templates/list_view.hbs";
import "./marker_li.scss";
import $ from "jquery";

class GasStationView extends View {

    className() {
        return "list-group-item list-group-item-action list-info-gs my-stylish";
    }

    template(data) {
        return `<strong>АЗС:</strong> ${data.title} <br> <strong>Адрес:</strong> ${data.address}`;
    }

    modelEvents() {
        return {
            change: "render"
        };
    }

    onRender() {
        this.$el.toggleClass("active", this.model.get("active"));
    }

    triggers() {
        return {
            click: "child:click"
        };
    }
}

class GasStationCollectionView extends CollectionView {

    className() {
        return "list-group";
    }

    childView() {
        return GasStationView;
    }

    regions() {
        return {
            'pPages': '.page-link.pages',
        }
    }

    childViewEvents() {
        return {
            "child:click": view => {
                const child = this.collection.find(model => model.get("active"));
                if (child) {
                    child.set("active", false);
                }
                view.model.set("active", true, {
                    animate: true
                });
            }
        };
    }
}

export class MarkerView extends View {
    initialize() {
        this.pagination = new Backbone.Collection();
        this.model = new Backbone.Model({
            offset: 0,
            limit: 4,
            total: 0,
            limiter: [{
                    value: 4,
                    selected: true
                },
                {
                    value: 6,
                    selected: false
                },
                {
                    value: 10,
                    selected: false
                },
            ],
        });
        this.initListener();
    }

    initListener() {
        const collection = this.getOption("collection");
        this.listenTo(collection, {
            update: collection => {
                const {
                    offset,
                    limit
                } = this.model.pick("limit", "offset");
                const models = collection.models.slice(offset, offset + limit);
                this.pagination.reset(models);
                this.model.set({
                    total: collection.length,
                })
                this.render();
            }
        });
    }

    tagName() {
        return "div";
    }

    className() {
        return "all-markers";
    }

    template(data) {
        let {
            offset,
            total,
            limit,
        } = data;
        let top = Number(offset) + Number(limit);
        top = top > total ? total : top;
        offset++;
        return markerList({
            ...data,
            top,
            offset
        });
    }

    ui() {
        return {
            sArea: ".search-area",
            sControl: ".search-controls",
            sBar: ".search-bar",
            cteR: ".container",
            pNext: ".page-link.next",
            pPrevious: ".page-link.previous",
        };
    }

    regions() {
        return {
            qlist: ".sights-list"
        };
    }

    onRender() {
        this.showChildView(
            "qlist",
            new GasStationCollectionView({
                collection: this.pagination
            })
        );
        const collection = this.getOption("collection");
        const {
            offset,
            limit
        } = this.model.pick("offset", "limit");
        this.ui.pPrevious.toggleClass("disabled", offset === 0);
        $('.page-link.previous').prop('disabled', offset === 0);
        this.ui.pNext.toggleClass("disabled", offset + limit >= collection.length);
        $('.page-link.next').prop('disabled', offset + limit >= collection.length);
    }

    events() {
        return {
            "click @ui.pNext": "onClickNext",
            "click .page-link.previous": "onClickPrevious",
            "click .page-link.limiter": "onClickLimiter",
        };
    }

    triggers() {
        return {
            "keyup .search-bar": "data:entered",
        };
    }

    onClickLimiter(e) {
        let sLimit = $(e.target).attr('data-limiter');
        let idLimit = $(e.target).attr('data-id');
        let newLimiter = JSON.parse(JSON.stringify(this.model.get("limiter")));
        newLimiter[0].selected = true;
        let oldTrue = _.findWhere(newLimiter, { "selected": true }).selected = false;
        for (let i = 0; i < newLimiter.length; i++) {
            if (idLimit == i) {
                let newTrue = newLimiter[i].selected = true;
            } else {
                newLimiter[i].selected = false;
            }
        }
        this.model.set({
            offset: 0,
            limit: Number(sLimit),
            limiter: newLimiter,
        });
    }

    onDataEntered(view, event) {
        if (event.originalEvent.keyCode != 13) {
            return;
        }
        this.model.set({
            offset: 0,
            limit: this.model.get("limit"),
        });
        let searchKey = event.target.value;
        if (searchKey.length == 0) {
            this.collection.fetch();
        } else {
            this.collection.fetch({
                url: "/api/gas_stations/?title__icontains=" + searchKey
            });
        }
    }

    modelEvents() {
        return {
            change: "render",
            "change:offset": (model, offset, options) => {
                const limit = this.model.get("limit");
                this.pagination.reset(
                    this.collection.models.slice(offset, offset + limit)
                );
            },
            "change:limit": (model, options) => {

                const {
                    limit,
                    offset
                } = this.model.pick("limit", "offset");
                this.pagination.reset(
                    this.collection.models.slice(offset, offset + limit)
                );
            },
            "change:limiter": (model, option) => {
                //TODOsomething
            },
        };
    }

    onClickNext() {
        const {
            limit,
            offset
        } = this.model.pick("limit", "offset");
        this.model.set({
            offset: offset + limit
        });
    }

    onClickPrevious() {
        const {
            limit,
            offset
        } = this.model.pick("limit", "offset");
        this.model.set({
            offset: offset - limit
        });
    }
}