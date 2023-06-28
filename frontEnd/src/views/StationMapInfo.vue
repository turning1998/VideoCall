<template>
  <div id="map" style="height:85vh;position:relative">
    <div class="station-color">
      <div v-for="item in colorList" style="height:19px;margin:8px 5px">
        <span class="circle" :style="{ background: item.color, }"></span>
        <span style="line-height:17px;margin-left:10px;display:inline-block;">{{ item.label }}</span>
      </div>
    </div>
    <div class="station-view">
      <div style="padding:10px;background:rgb(75, 75, 154);color:#fff;margin-bottom:10px">控制窗口</div>
      <div style="padding:10px">
        <a-checkbox-group v-model:value="StationValue" @change="checkboxChange" :options="colorList" />
      </div>

    </div>
  </div>
</template>

<script>
import {
  fetchStationInfo
} from "@/api/base.js";
import "ol/ol.css";
import LayoutDrawerList from "@/layouts/LayoutDrawerList.vue";
import { onMounted, reactive, ref, toRefs } from "vue";
import { defineComponent } from 'vue';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Map, View, Feature } from "ol";
import {OSM, Vector as VectorSource } from "ol/source";
import { Tile as TileLayer, Vector as VectorLayer } from "ol/layer";
import { Fill, Stroke, Style, Text, Circle, Icon } from "ol/style";
import { Point, } from "ol/geom";
import Vector from "ol/layer/Vector";
import XYZ from 'ol/source/XYZ'
// 站点分布地图
export default defineComponent({
  name: 'StationMap',

  setup(props, { emit }) {
    let colorList = [{
      label: '国家站',
      value: '国家站',
      color: '#0000ff',
    }, {
      label: '区域站',
      value: '区域站',
      color: '#bfff00'
    }, {
      label: '生物舒适度仪',
      value: '生物舒适度仪',
      color: '#283747'
    }, {
      label: '回南天站',
      value: '回南天站',
      color: '#BB8FCE'
    }, {
      label: '自动土壤站',
      value: '自动土壤站',
      color: '#808000'
    }, {
      label: 'GPSMET',
      value: 'GPSMET',
      color: '#FFFF00'
    }, {
      label: '大气成分站',
      value: '大气成分站',
      color: '#800000'
    }, {
      label: '沿海区域站',
      value: '沿海区域站',
      color: '#FF0000'
    }, {
      label: '海岛站(含双套站3个)',
      value: '海岛站(含双套站3个)',
      color: '#800080'
    }, {
      label: '交通站',
      value: '交通站',
      color: '#008080'
    }, {
      label: '能见度站',
      value: '能见度站',
      color: '#FF00FF'
    }, {
      label: '船舶站',
      value: '船舶站',
      color: '#00FFFF'
    }, {
      label: '浮标站',
      value: '浮标站',
      color: '#000000'
    }, {
      label: "石油平台站",
      value: "石油平台站",
      color: '#66CC66'
    }]
    const state = reactive({
      StationValue: ['国家站']
    });
    let mainMap = reactive({});
    let cusLayer = reactive({});
    let boundarySource = reactive({});
    let layers = reactive({});
    let boundaryLayer = reactive({})
    let stationList = ref({})
    let view = reactive({});
    let pointVctorLayer = reactive({})

    //绘制点函数
    //绘制点函数
    const drawPoint = (PointName, coordinates) => {
      let colorValue = undefined
      colorList.forEach((item) => {
        if (item.label === PointName) {
          colorValue = item.color

        }
      })
      var vectorSource = new VectorSource({});
      coordinates.forEach(element => {
        var iconFeature = new Feature({
          geometry: new Point(element),
        });
        var iconStyle = new Style({
          image: new Circle({
            radius: 10,
            fill: new Fill({ color: colorValue }),
            stroke: new Stroke({
              color: 'rgba(255, 255, 255, 0.5)',
              width: 5
            })


          }),

        });
        iconFeature.setStyle(iconStyle);
        vectorSource.addFeature(iconFeature);
      });
      var vectorLayer = new Vector({
        title: "equipment",
        name: PointName,
        source: vectorSource
      });
      // return vectorLayer;
      mainMap.addLayer(vectorLayer)
    }

    const checkboxChange = () => {
      mainMap.getLayers().getArray().forEach((item) => {
        item.setVisible(false)
        if (state.StationValue.includes(item.get("name"))) {
          item.setVisible(true)
        }
      })
      mainMap.getLayers().getArray()[0].setVisible(true)
      mainMap.getLayers().getArray()[1].setVisible(true)
    }
    const getStationInfo = async () => {
      let res = await fetchStationInfo()

      if (res.success) {
        Object.keys(res.data.data).forEach((key) => {
          let arr = []
          res.data.data[key].forEach((item, index) => {
            arr.push([Number(item.lon), Number(item.lat)])

          })
          stationList.value[key] = arr
        })
        for (var key in stationList.value) {
          drawPoint(key, stationList.value[key])
        }
        checkboxChange()

      }

    }
    onMounted(async () => {
      getStationInfo()

      let extent = [104.59494272659059, 16.938524582136264, 114.49403073579604, 22.813287298845577]
      var layers = [
        new TileLayer({
          // source: new OSM(),
          source: new XYZ({
          url: 'http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}'  // 
        })
        }),
        new VectorLayer({
          source: new VectorSource({
            url: "zhanjiang.json",
            format: new GeoJSON()
          }),
          style: {
            "stroke-color": "red",
            "stroke-width": 3,
            // "circle-radius": 7,
          },
        })
      ];
      mainMap = new Map({
        layers: layers,
        target: "map",
        view: new View({
          projection: "EPSG:4326",
          center: ol.extent.getCenter(extent),
          zoom: 7.706501252468913,
          extent: extent
        })
      });
      mainMap.on("moveend",function(e){
    var zoom = mainMap.getView().getZoom();  //获取当前地图的缩放级别
    // console.log(zoom);
    // console.log(mainMap.getView().calculateExtent())
});  
    })


    return {
      drawPoint,
      checkboxChange,
      getStationInfo,
      stationList,
      mainMap, view, layers, boundarySource, boundaryLayer, colorList,
      ...toRefs(state),

    };
  },
});
</script>

<style lang="scss" scoped>
.station-view {
  position: absolute;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 5px;
  box-shadow: 0px 12px 39px 1px rgba(35, 35, 35, 0.1);
  top: 70px;
  z-index: 999999;
  left: 0px;
  width: 200px;
  height: 400px;


}

.station-color {
  font-weight: 600;
  font-size: 15px;
  padding: 10px;
  position: absolute;
  width: 200px;
  height: 400px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 5px;
  box-shadow: 0px 12px 39px 1px rgba(35, 35, 35, 0.1);
  bottom: 15px;
  z-index: 999999;
  right: 10px;
  text-align: left;
  vertical-align: middle;
}

.circle {
  background: lightblue;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  position: relative;
  top: 5px;
  display: inline-block;

}
</style>
