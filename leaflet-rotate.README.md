# Instructions for swapping out leaflet for leaflet-rotate-map

leaflet-rotate-map is being used replace some of the code in leaflet master which still doesnt support map rotation. There is no guarantee of future version parity.

## Steps to replace

Follow thse steps to create a Typescript compatible module. We are going to replace the leaflet/dist folder with a newly created leaflet-rotate-map/dist folder and move typings into the project

- npm i leaflet leaflet-rotate-map
- npm i --save-dev @types/leaflet
- cd node_modules/leaflet-rotate-map
- create a leaflet-rotate-map/dist folder
- replace leaflet/dist with leaflet-rotate-map/dist
- move leaflet/dist/index.d.ts to {project-root}/global.d.ts
- note: no need to modify root project.json file
