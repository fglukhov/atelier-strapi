const STRAPI_BASE_URL = 'https://devatelier.wall.black'

const axiosbw = axios.create({
  baseURL: STRAPI_BASE_URL,
})

const getFabricTypes = () => {
  return axiosbw.get('fabric-types').then(res => (res.data))
}

const getFabrics = () => {
  return axiosbw.get('fabrics').then(res => (res.data))
}

const getProductTypes = () => {
  return axiosbw.get('product-types').then(res => (res.data))
}

const getCases = () => {
  return axiosbw.get('cases').then(res => (res.data))
}

const ImageAdapter = (data) => {
  if (!data) { return null }
  return {
    id: data.id,
    altText: data.alternativeText,
    url: data.url ? STRAPI_BASE_URL + data.url : null,
  }
}

const FabricAdapter = (data) => {
  if (!data) { return null }
  const fabricType = FabricTypeAdapter(data.fabric_type)
  return {
    id: data.id,
    label: data.label,
    description: data.description,
    info: data.info,
    mainImage: ImageAdapter(data.main_image),
    mainImageUrl: ImageAdapter(data.main_image)?.url,
    shades: data.shades ? data.shades.map(ImageAdapter) : [],
    fabricType,
    fabricTypeId: fabricType?.id,
    fabricTypeLabel: fabricType?.label,
    productTypes: data.product_types ? data.product_types.map(CaseAdapter) : [],
    cases: data.cases ? data.cases.map(CaseAdapter) : [],
  }
}

const FabricTypeAdapter = (data) => {
  if (!data) { return null }
  return {
    id: data.id,
    label: data.label,
    fabrics: data.fabrics ? data.fabrics.map(FabricAdapter) : []
  }
}

const ProductTypeAdapter = (data) => {
  if (!data) { return null }
  return {
    id: data.id,
    label: data.label,
    description: data.description,
    info: data.info,
    fabrics: data.fabrics ? data.fabrics.map(FabricAdapter) : [],
    mainImage: ImageAdapter(data.main_image),
    mainImageUrl: ImageAdapter(data.main_image)?.url,
    images: data.images ? data.images.map(ImageAdapter) : [],
    fabrics: data.fabrics ? data.fabrics.map(FabricAdapter) : [],
    cases: data.cases ? data.cases.map(CaseAdapter) : [],
  }
}

const CaseAdapter = (data) => {
  if (!data) { return null }
  const productType = ProductTypeAdapter(data.product_type)
  return {
    id: data.id,
    label: data.label,
    description: data.description,
    info: data.info,
    fabrics: data.fabrics ? data.fabrics.map(FabricAdapter) : [],
    mainImage: ImageAdapter(data.main_image),
    mainImageUrl: ImageAdapter(data.main_image)?.url,
    images: data.images ? data.images.map(ImageAdapter) : [],
    fabrics: data.fabrics ? data.fabrics.map(FabricAdapter) : [],
    productType,
    productTypeId: productType?.id,
    productTypeLabel: productType?.label,
  }
}

const accKeyDefault = 'unique_acc_42'

const app = new Vue({
  el: '#app',
  data: {
    fabricTypesRaw: [],
    fabricsRaw: [],
    productTypesRaw: [],
    casesRaw: [],
    dataLoaded: false,
    selectedFabricsTabId: accKeyDefault,
    selectedFabric: null,
    selectedProductTypeForModal: null,
    selectedProductTypeTabId: accKeyDefault,
  },
  computed: {
    fabricTypes () { return this.fabricTypesRaw.map(FabricTypeAdapter) },
    fabrics () { return this.fabricsRaw.map(FabricAdapter) },
    productTypes () { return this.productTypesRaw.map(ProductTypeAdapter) },
    cases () { return this.casesRaw.map(CaseAdapter) },
    fabricTypesMap () {
      return this.getMapByKey({
        arr: this.fabrics,
        accLabel: 'Все ткани',
        groupKey: 'fabricTypeId',
        labelKey: 'fabricTypeLabel',
      })
    },
    fabricTypesTabs () {
      return Object.keys(this.fabricTypesMap).map((key) => {
        return {
          id: this.fabricTypesMap[key].id,
          label: this.fabricTypesMap[key].label,
        }
      })
    },
    selectedFabricsTab () {
      return this.fabricTypesMap[this.selectedFabricsTabId]
    },
    selectedFabricsTabList () {
      return this.selectedFabricsTab?.list || []
    },
    casesByProductTypeMap () {
      return this.getMapByKey({
        arr: this.cases,
        accLabel: 'Вся продукция',
        groupKey: 'productTypeId',
        labelKey: 'productTypeLabel',
      })
    },
    productTypesTabs () {
      return Object.keys(this.casesByProductTypeMap).map((key) => {
        return {
          id: this.casesByProductTypeMap[key].id,
          label: this.casesByProductTypeMap[key].label,
        }
      })
    },
    selectedProductTypeCases () {
      if (!this.selectedProductTypeForModal) { return [] }
      return this.casesByProductTypeMap[this.selectedProductTypeForModal?.id]?.list || []
    },
    selectedProductTypeTab () {
      return this.casesByProductTypeMap[this.selectedProductTypeTabId]
    },
    selectedProductTypeTabList () {
      return this.selectedProductTypeTab?.list || []
    },
  },
  created () {
    try {
      Promise.all([
        getFabricTypes(),
        getFabrics(),
        getProductTypes(),
        getCases()
      ]).then(([
        fabricTypes,
        fabrics,
        productTypes,
        cases,
      ]) => {
        this.fabricTypesRaw = fabricTypes
        this.fabricsRaw = fabrics
        this.productTypesRaw = productTypes
        this.casesRaw = cases
        this.dataLoaded = true
      })
    }
    catch(err) {
      console.error(err)
    }
  },
  mounted () {
    
  },
  watch: {
    dataLoaded: {
      immediate: true,
      handler(val) {
        if (val) {
          this.initSliders()
        }
      }
    },
    selectedFabricsTabId(val) {
      if (this.dataLoaded && val) {
        this.initSliders()
      }
    },
    selectedProductTypeTabId(val) {
      if (this.dataLoaded && val) {
        this.initSliders()
      }
    }
  },
  methods: {
    initSliders () {
      this.$nextTick(() => {
        $(document).ready(function() {
          initSliders()
        })
      })
    },
    getMapByKey ({ arr, accLabel, groupKey, labelKey, accKey = accKeyDefault } = { accKey: accKeyDefault }) {
      return arr.reduce((acc, item) => {
        if (!acc[item[groupKey]]) {
          acc[item[groupKey]] = {
            id: item[groupKey],
            label: item[labelKey],
            list: []
          }
        }
        acc[item[groupKey]].list.push(item)
        return acc
      }, {
        [accKey]: {
          id: accKey,
          label: accLabel,
          list: arr
        }
      })
    },
    handleProdModalClose () {
      this.selectedFabric = null
      this.selectedProductType = null
    },
  }
})