Vue.component('product-type-modal', {
  data: function () {
    return {
      fabricSliderId: 'fabric-slider-prod-modal'
    }
  },
  props: {
    data: {
      type: Object,
      default: () => ({})
    },
    cases: {
      type: Array,
      default: () => ([])
    }
  },
  computed: {
    id () { return this.data?.id },
    label () { return this.data?.label || '' },
    description () { return this.data?.description || '' },
    info () { return this.data?.info?.split('\n') || [] },
    images () { return this.data?.images || [this.data?.mainImageUrl] },
    fabrics () { return this.data?.fabrics || [] },
  },
  methods: {
    getBgImageStyle (item) {
      return `backgroundImage: url(${item.mainImageUrl})`
    }
  },
  template: `
    <div class="ajax-modal-content">
      <div class="prod-modal-content">
        <div class="prod-item-top">
          <div class="prod-item-slider-wrapper">
            <div class="prod-item-slider" id="prod-item-slider" :key="id">
              <div class="slide" v-for="image in images">
                <img :src="(image && image.url) || '#'"/>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="row">
              <div class="col prod-col">
                <div class="prod-item-descr">
                  <div class="section-header">
                    <h2>{{ label }}</h2>
                    <div class="section-info">
                      <p>{{ description }}</p>
                    </div>
                  </div>
                  <div class="prod-item-text">
                    <p v-for="(paragraph, i) in info" :key="i">{{ paragraph }}</p>
                  </div>
                  <div class="prod-item-pros-wrapper">
                    <div class="section-sup-ttl">преимущества работы с ним</div>
                    <div class="des-pros-list">
                      <div class="des-pros-tmb">
                        <div class="des-pros-tmb-pic"><img src="images/des-pros-1.svg"/></div>
                        <div class="des-pros-tmb-descr">
                          <h3>Подберем текстиль</h3>
                          <p>под визуализацию проекта, совместим по&nbsp;цвету и&nbsp;дизайну все необходимые компоненты.</p>
                        </div>
                      </div>
                      <div class="des-pros-tmb">
                        <div class="des-pros-tmb-pic"><img src="images/des-pros-3.svg"/></div>
                        <div class="des-pros-tmb-descr">
                          <h3>Рассчитаем размеры</h3>
                          <p>и&nbsp;сделаем образцы для утверждения с&nbsp;клиентом.</p>
                        </div>
                      </div>
                      <div class="des-pros-tmb">
                        <div class="des-pros-tmb-pic"><img src="images/des-pros-5.svg"/></div>
                        <div class="des-pros-tmb-descr">
                          <h3>Оформим предложение</h3>
                          <p>готовых изделий для любых нестандартных моделей матрасов и&nbsp;видов мебели.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="prod-item-section prod-item-section-fabrics">
          <div class="container">
            <div class="prod-item-section-header">
              <h2>Мы используем ткани</h2>
            </div>
          </div>
          <div class="fabric-slider" id="fabric-slider" :key="id">
            <div class="slide" v-for="item in fabrics">
              <a
                class="fabric-tmb"
                href="#"
                data-toggle="modal"
                data-target="#fabricModal"
                data-url="load/fabric-1-1.html"
                data-hash="fabric-1-1"
                @click="$emit('select-fabric', item)"
              >
                <div class="fabric-tmb-pic" :style="getBgImageStyle(item)"></div>
                <div class="fabric-tmb-content">
                  <div class="fabric-tmb-arrow"></div>
                  <div class="fabric-tmb-ttl">
                    <p>{{ item.label }}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
        <div class="prod-item-section prod-item-section-cases">
          <div class="container">
            <div class="prod-item-section-header">
              <h2>Наши проекты</h2>
            </div>
            <div class="custom-slider-wrapper cases-slider-wrapper">
              <div class="custom-slider cases-slider" id="cases-slider" :key="id">
                <div class="slide" v-for="item in cases" :key="item.id">
                  <a class="case-tmb" href="#">
                    <div class="case-tmb-pic"><img :src="item.mainImageUrl"/></div>
                    <div class="case-tmb-descr">
                      <div class="case-tmb-ttl">
                        <h3>{{ item.label }}</h3>
                      </div>
                      <div class="case-tmb-info">
                        <p>{{ (item.fabrics && item.fabrics[0] && item.fabrics[0].label) || '' }}</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="prod-item-section prod-item-section-catalog">
          <div class="container">
            <div class="catalog-form-wrapper">
              <div class="catalog-form-pic"><img src="images/catalog-form-pic.png"/></div>
              <div class="catalog-form-inner">
                <h2>Получите каталог</h2>
                <div class="catalog-form">
                  <form>
                    <div class="row">
                      <div class="col catalog-form-col-narrow">
                        <div class="form-group">
                          <label class="placeholder" for="catalog_modal_name">Представьтесь</label>
                          <input type="text" name="catalog_modal_name" id="catalog_modal_name" required="required"/>
                        </div>
                      </div>
                      <div class="col catalog-form-col-narrow">
                        <div class="form-group">
                          <label class="placeholder" for="catalog_modal_phone">Телефон</label>
                          <input class="input-phone" type="text" name="catalog_modal_phone" id="catalog_modal_phone" required="required"/>
                        </div>
                      </div>
                      <div class="col catalog-form-col-wide">
                        <div class="form-agree">
                          <p>Нажимая кнопку “Отправить” вы даете свое согласие с <a href="#" target="_blank">политикой обработки персональных данных</a></p>
                        </div>
                      </div>
                      <div class="col catalog-form-col-wide">
                        <div class="form-footer">
                          <input class="btn btn-1" type="submit" value="Отправить"/>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  `
})
