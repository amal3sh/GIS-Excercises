import './style.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Draw from 'ol/interaction/Draw';


const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM()
    })
  ],
  view: new View({
    center: [0, 0],
    zoom: 2
  })
});
 
const sources = {
  'Point': new VectorSource(),
  'Polygon': new VectorSource(),
  'Circle': new VectorSource(),
  
}
const layers = {
  'Point' : new VectorLayer({source: sources.Point}),
  'Polygon': new VectorLayer({source:sources.Polygon}),
  'Circle' : new VectorLayer({source:sources.Circle}),

}
map.addLayer(layers.Point);
map.addLayer(layers.Polygon);
map.addLayer(layers.Circle);


let draw;
 const typeSelect = document.getElementById('type');
 function addInteraction()
 {
   const value = typeSelect.value;
   draw = new Draw({
     source:sources[value],
     type: typeSelect.value,
   });
   map.addInteraction(draw);

 }
 typeSelect.onchange = ()=>
 {
   map.removeInteraction(draw);
   addInteraction();
 }
 addInteraction();
 const pointStat = document.getElementById("pointBox");
 const circleStat = document.getElementById("circleBox");
 const polygonStat = document.getElementById("polygonBox");
 const dispLayer = (layerName,display)=>
 {
   if(display)
   map.addLayer(layers[layerName]);
   else
   map.removeLayer(layers[layerName]);
 }
 pointStat.addEventListener('change',()=>{
   dispLayer('Point',pointStat.checked);
 });

 circleStat.addEventListener('change',()=>
 {
   dispLayer('Circle',circleStat.checked);
 });

 polygonStat.addEventListener('change',()=>{
   dispLayer('Polygon',polygonStat.checked);
 })