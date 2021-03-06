Vue.component('fabric-modal', {
  data: function () {
    return {

    }
  },
  props: {
    data: {
      type: Object,
      default: null,
    }
  },
  computed: {
    bgStyle () {
      return `backgroundImage: url(${this.data?.mainImageUrl})`
    },
    fabricType () { return this.data?.fabricType?.label || '' },
    label () { return this.data?.label || '' },
    description () { return this.data?.description || '' },
    info () { return this.data?.info?.split('\n') || [] },
    shades () { return this.data?.shades },
  },
  template: `
    <div class="ajax-modal-content">
      <div class="fabric-modal-bg" :style="bgStyle"></div>
      <div class="fabric-modal-content">
        <div class="container">
          <div class="row">
            <div class="col fabric-col-1">
              <div class="fabric-item-descr">
                <div class="section-header">
                  <div class="section-sup-ttl">
                    <p>{{ fabricType }}</p>
                  </div>
                  <h2>{{ label }}</h2>
                  <div class="section-info">
                    <p>{{ description }}</p>
                  </div>
                </div>
                <div class="fabric-item-text">
                  <p v-for="(paragraph, i) in info" :key="i">{{ paragraph }}</p>
                </div>
              </div>
            </div>
            <div class="col fabric-col-2">
              <div class="catalog-form-wrapper catalog-form-wrapper-alt">
                <div class="catalog-form-pic"><img src="images/catalog-form-pic.png"/></div>
                <div class="catalog-form-inner">
                  <h2>Узнайте стоимость Вашего постельного белья</h2>
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
          <div class="fabric-vars">
            <div class="section-header">
              <div class="section-sup-ttl">
                <p>доступные цвета / оттенки</p>
              </div>
            </div>
            <div v-if="shades" class="vars-list">
              <div v-for="shade in shades" class="vars-item" href="files/var-1-big.jpg">
                <img :src="shade.url"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  `
})
