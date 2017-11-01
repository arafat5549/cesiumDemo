(function () {
    "use strict";
     var isInit = 0;
    Cesium.BingMapsApi.defaultKey = 'AihaXS6TtE_olKOVdtkMenAMq1L5nDlnU69mRtNisz1vZavr1HhdqGRNkB2Bcqvs'; // For use with this application only

    //////////////////////////////////////////////////////////////////////////
    // Creating the Viewer
    //////////////////////////////////////////////////////////////////////////

    var viewer = new Cesium.Viewer('cesiumContainer', {
        //scene3DOnly: true,
        selectionIndicator: false
        ,baseLayerPicker: false
    });



   


    //////////////////////////////////////////////////////////////////////////
    // Loading Imagery
    //////////////////////////////////////////////////////////////////////////

    // Add Bing imagery
    // viewer.imageryLayers.addImageryProvider(new Cesium.BingMapsImageryProvider({
    //     url : 'https://dev.virtualearth.net',
    //     mapStyle: Cesium.BingMapsStyle.AERIAL // Can also use Cesium.BingMapsStyle.ROAD
    // }));

    viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
        url: "http://t1.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles",
        layer: "tdtBasicLayer",
        style: "default",
        format: "image/jpeg",
        tileMatrixSetID: "GoogleMapsCompatible",
        show: false,
        credit : new Cesium.Credit('猎速地球内部预览版')

    }))
    //////////////////////////////////////////////////////////////////////////
    // Loading Terrain
    //////////////////////////////////////////////////////////////////////////

    // Load STK World Terrain
    viewer.terrainProvider = new Cesium.CesiumTerrainProvider({
        url : 'https://assets.agi.com/stk-terrain/world',
        requestWaterMask : true, // required for water effects
        requestVertexNormals : false // required for terrain lighting
    });
    // Enable depth testing so things behind the terrain disappear.
    viewer.scene.globe.depthTestAgainstTerrain = true;

    //////////////////////////////////////////////////////////////////////////
    // Configuring the Scene
    //////////////////////////////////////////////////////////////////////////

    // Enable lighting based on sun/moon positions
    //viewer.scene.globe.enableLighting = true;

    // Create an initial camera view
    // var initialPosition = new Cesium.Cartesian3.fromDegrees(103.503985625, 29.0712038398437, 102031.082799425431);
    // var initialPosition = new Cesium.Cartesian3.fromDegrees(104.503985625, 28.0712038398437, 202031.082799425431);


    var initialPosition = new Cesium.Cartesian3.fromDegrees(117.233350859375,24.5098488593751, 102031.082799425431);
    //new Cesium.Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 2631.082799425431);
    var initialOrientation = new Cesium.HeadingPitchRoll.fromDegrees(7.1077496389876024807, -31.987223091598949054, 0.025883251314954971306);
    var homeCameraView = {
        destination : initialPosition,
        orientation : {
            heading : initialOrientation.heading,
            pitch : initialOrientation.pitch,
            roll : initialOrientation.roll
        }
    };
    // Set the initial view
    viewer.scene.camera.setView(homeCameraView);

    // Add some camera flight animation options
    homeCameraView.duration = 2.0;
    homeCameraView.maximumHeight = 2000;
    homeCameraView.pitchAdjustHeight = 2000;
    homeCameraView.endTransform = Cesium.Matrix4.IDENTITY;
    // Override the default home button
    viewer.homeButton.viewModel.command.beforeExecute.addEventListener(function (e) {
        e.cancel = true;
        viewer.scene.camera.flyTo(homeCameraView);
    });

    // Set up clock and timeline.
    viewer.clock.shouldAnimate = true; // default
    viewer.clock.startTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:00:00Z");
    viewer.clock.stopTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:20:00Z");
    viewer.clock.currentTime = Cesium.JulianDate.fromIso8601("2017-07-11T16:00:00Z");
    viewer.clock.multiplier = 2; // sets a speedup
    viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK_MULTIPLIER; // tick computation mode
    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; // loop at the end
    viewer.timeline.zoomTo(viewer.clock.startTime, viewer.clock.stopTime); // set visible range

    //////////////////////////////////////////////////////////////////////////
    // Loading and Styling Entity Data
    //////////////////////////////////////////////////////////////////////////

    var kmlOptions = {
        camera : viewer.scene.camera,
        canvas : viewer.scene.canvas,
        clampToGround : true
    };
    // Load geocache points of interest from a KML file
    // Data from : http://catalog.opendata.city/dataset/pediacities-nyc-neighborhoods/resource/91778048-3c58-449c-a3f9-365ed203e914
    // var geocachePromise = Cesium.KmlDataSource.load('./Source/SampleData/sampleGeocacheLocations.kml', kmlOptions);
    // // Add geocache billboard entities to scene and style them
    // geocachePromise.then(function(dataSource) {
    //     // Add the new data as entities to the viewer
    //     viewer.dataSources.add(dataSource);

    //     // Get the array of entities
    //     var geocacheEntities = dataSource.entities.values;

    //     for (var i = 0; i < geocacheEntities.length; i++) {
    //         var entity = geocacheEntities[i];
    //         if (Cesium.defined(entity.billboard)) {
    //             // Adjust the vertical origin so pins sit on terrain
    //             entity.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
    //             // Disable the labels to reduce clutter
    //             entity.label = undefined;
    //             // Add distance display condition
    //             entity.billboard.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(10.0, 20000.0);
    //             // Compute latitude and longitude in degrees
    //             var cartographicPosition = Cesium.Cartographic.fromCartesian(entity.position.getValue(Cesium.JulianDate.now()));
    //             var latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);
    //             var longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
    //             // Modify description
    //             var description = '<table class="cesium-infoBox-defaultTable cesium-infoBox-defaultTable-lighter"><tbody>';
    //             description += '<tr><th>' + "Latitude" + '</th><td>' + latitude + '</td></tr>';
    //             description += '<tr><th>' + "Longitude" + '</th><td>' + longitude + '</td></tr>';
    //             description += '</tbody></table>';
    //             entity.description = description;
    //         }
    //     }
    // });
    // chengd
    var sanming_geocachePromise = Cesium.KmlDataSource.load('./Source/SampleData/sanmingGeocacheLocations.kml', kmlOptions);
    sanming_geocachePromise.then(function(dataSource) {
        // Add the new data as entities to the viewer
        viewer.dataSources.add(dataSource);

        // Get the array of entities
        var geocacheEntities = dataSource.entities.values;

        for (var i = 0; i < geocacheEntities.length; i++) {
            var entity = geocacheEntities[i];
            if (Cesium.defined(entity.billboard)) {
                // Adjust the vertical origin so pins sit on terrain
                entity.billboard.verticalOrigin = Cesium.VerticalOrigin.BOTTOM;
                // Disable the labels to reduce clutter
                entity.label = undefined;
                // Add distance display condition
                entity.billboard.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(100.0, 800000.0);
                // Compute latitude and longitude in degrees
                var cartographicPosition = Cesium.Cartographic.fromCartesian(entity.position.getValue(Cesium.JulianDate.now()));
                var latitude = Cesium.Math.toDegrees(cartographicPosition.latitude);
                var longitude = Cesium.Math.toDegrees(cartographicPosition.longitude);
                // Modify description
                var description = '<table class="cesium-infoBox-defaultTable cesium-infoBox-defaultTable-lighter"><tbody>';
                description += '<tr><th>' + "电话" + '</th><td>' + entity._kml.extendedData.phone.value + '</td></tr>';
                description += '<tr><th>' + "所属河段" + '</th><td>' +  entity._kml.extendedData.river.value + '</td></tr>';
                description += '<tr><th>' + "巡查类型" + '</th><td>' +  entity._kml.extendedData.type.value + '</td></tr>';
                description += '<tr><th>' + "坐标" + '</th><td>' + latitude + '，'+longitude+'</td></tr>';
                description += '<tr><th>' + "行政区划" + '</th><td>' + entity._kml.extendedData.organ.value + '</td></tr>';
                description += '</tbody></table>';
                entity.description = description;
            }
        }
    });


    var geojsonOptions = {
        clampToGround : true
    };
    // Load neighborhood boundaries from a GeoJson file
    // Data from : https://data.cityofnewyork.us/City-Government/Neighborhood-Tabulation-Areas/cpf4-rkhq
    var neighborhoodsPromise = Cesium.GeoJsonDataSource.load('./Source/SampleData/sampleNeighborhoods.geojson', geojsonOptions);

    // Save an new entity collection of neighborhood data
    var neighborhoods;
    neighborhoodsPromise.then(function(dataSource) {
        // Add the new data as entities to the viewer
        viewer.dataSources.add(dataSource);
        neighborhoods = dataSource.entities;

        // Get the array of entities
        var neighborhoodEntities = dataSource.entities.values;
        for (var i = 0; i < neighborhoodEntities.length; i++) {
            var entity = neighborhoodEntities[i];

            if (Cesium.defined(entity.polygon)) {
                // Use kml neighborhood value as entity name
                entity.name = entity.properties.neighborhood;
                //console.log(" .name ="+ entity.name )
                // Set the polygon material to a random, translucent color
                entity.polygon.material = Cesium.Color.fromRandom({
                    red : 0.1,
                    maximumGreen : 0.5,
                    minimumBlue : 0.5,
                    alpha : 0.6
                });
                // Generate Polygon center
                var polyPositions = entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
                polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
                entity.position = polyCenter;
                //console.log(entity.position);
                // Generate labels
                entity.label = {
                    text : entity.name,
                    showBackground : true,
                    scale : 0.6,
                    horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
                    verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                    distanceDisplayCondition : new Cesium.DistanceDisplayCondition(10.0, 8000.0),
                    disableDepthTestDistance : Number.POSITIVE_INFINITY
                };  
            }
        }
    });

    // 三明市区域
    var sanmingPromise = Cesium.GeoJsonDataSource.load('./Source/SampleData/sanming.geojson', geojsonOptions);
    var sanming_neighborhoods;
    var sanming_hashSet = {};
    sanmingPromise.then(function(dataSource) {
        // Add the new data as entities to the viewer
        viewer.dataSources.add(dataSource);
        sanming_neighborhoods = dataSource.entities;

        // Get the array of entities
        var sanming_neighborhoodEntities = dataSource.entities.values;

        //console.log("len="+sanming_neighborhoodEntities.length)

        for (var i = 0; i < sanming_neighborhoodEntities.length; i++) {
            var sanming_entity = sanming_neighborhoodEntities[i];

            if (Cesium.defined(sanming_entity.polygon)) {
                // Use kml neighborhood value as entity name
                sanming_entity.name = sanming_entity.properties.name; //entity.nproperties.neighborhood;
                // Set the polygon material to a random, translucent color
                sanming_entity.polygon.material = Cesium.Color.fromRandom({
                    red : 0.4,
                    maximumGreen : 0.6,
                    minimumBlue : 0.6,
                    alpha : 0.6
                });
                // Generate Polygon center
                var sanming_polyPositions = sanming_entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                var sanming_polyCenter = Cesium.BoundingSphere.fromPoints(sanming_polyPositions).center;
                if(sanming_entity.name=="明溪县" ){
                   sanming_polyCenter.x += 30000;   
                   sanming_polyCenter.y -= 38000;     
                }
                else if(sanming_entity.name=="尤溪县"){
                   sanming_polyCenter.x += 12000;   
                   sanming_polyCenter.y -= 68000;     
                }
                sanming_polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(sanming_polyCenter);
                sanming_entity.position = sanming_polyCenter;


                // console.log(sanming_entity.polygon.distanceDisplayCondition);    
                sanming_entity.polygon.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(10, 800000);

                // Generate labels
                if(sanming_hashSet[sanming_entity.name] != 1){
                    sanming_entity.label = {
                        text : sanming_entity.name,
                        showBackground : true,
                        scale : 0.6,
                        horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
                        verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                        distanceDisplayCondition : new Cesium.DistanceDisplayCondition(100.0, 800000),
                        disableDepthTestDistance : Number.POSITIVE_INFINITY
                    };
                }

                sanming_hashSet[sanming_entity.name] = 1;   
            }
        }
        
    });


    





    // Load a drone flight path from a CZML file
    var dronePromise = Cesium.CzmlDataSource.load('./Source/SampleData/SampleFlight.czml');
    // Save a new drone model entity
    var drone;
    dronePromise.then(function(dataSource) {
        viewer.dataSources.add(dataSource);
        drone = dataSource.entities.values[0];
        // Attach a 3D model
        drone.model = {
            uri : './Source/SampleData/Models/CesiumDrone.gltf',
            minimumPixelSize : 128,
            maximumScale : 2000
        };
        // Add computed orientation based on sampled positions
        drone.orientation = new Cesium.VelocityOrientationProperty(drone.position);

        // Smooth path interpolation
        drone.position.setInterpolationOptions({
            interpolationAlgorithm : Cesium.HermitePolynomialApproximation,
            interpolationDegree : 2
        });
        drone.viewFrom = new Cesium.Cartesian3(-30, 0, 0);
    });

    //////////////////////////////////////////////////////////////////////////
    // Load 3D Tileset
    //////////////////////////////////////////////////////////////////////////
    
    // Load the NYC buildings tileset
    var city = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
        url: 'https://beta.cesium.com/api/assets/1461?access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJkYWJmM2MzNS02OWM5LTQ3OWItYjEyYS0xZmNlODM5ZDNkMTYiLCJpZCI6NDQsImFzc2V0cyI6WzE0NjFdLCJpYXQiOjE0OTkyNjQ3NDN9.vuR75SqPDKcggvUrG_vpx0Av02jdiAxnnB1fNf-9f7s',
        maximumScreenSpaceError: 16 // default value
    }));

    // Adjust the tileset height so it's not floating above terrain
    var heightOffset = -32;
    // city.readyPromise.then(function(tileset) {
    //     // Position tileset
    //     var boundingSphere = tileset.boundingSphere;
    //     var cartographic = Cesium.Cartographic.fromCartesian(boundingSphere.center);
    //     var surfacePosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, 0.0);
    //     var offsetPosition = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, heightOffset);
    //     var translation = Cesium.Cartesian3.subtract(offsetPosition, surfacePosition, new Cesium.Cartesian3());
    //     tileset.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
    // });
    
    //////////////////////////////////////////////////////////////////////////
    // Style 3D Tileset
    //////////////////////////////////////////////////////////////////////////

    // Define a white, opaque building style
    var defaultStyle = new Cesium.Cesium3DTileStyle({
        color : "color('white')",
        show : true
    });

    // Set the tileset style to default
    city.style = defaultStyle;

    // Define a white, transparent building style
    var transparentStyle = new Cesium.Cesium3DTileStyle({
        color : "color('white', 0.3)",
        show : true
    });

   // Define a style in which buildings are colored by height
    var heightStyle = new Cesium.Cesium3DTileStyle({
        color : {
            conditions : [
                ["${height} >= 300", "rgba(45, 0, 75, 0.5)"],
                ["${height} >= 200", "rgb(102, 71, 151)"],
                ["${height} >= 100", "rgb(170, 162, 204)"],
                ["${height} >= 50", "rgb(224, 226, 238)"],
                ["${height} >= 25", "rgb(252, 230, 200)"],
                ["${height} >= 10", "rgb(248, 176, 87)"],
                ["${height} >= 5", "rgb(198, 106, 11)"],
                ["true", "rgb(127, 59, 8)"]
            ]
        }
    });

    // var tileStyle = document.getElementById('tileStyle');
    // function set3DTileStyle() {
    //     var selectedStyle = tileStyle.options[tileStyle.selectedIndex].value;
    //     if (selectedStyle === 'none') {
    //         city.style = defaultStyle;
    //     } else if (selectedStyle === 'height') {
    //         city.style = heightStyle;
    //     } else if (selectedStyle === 'transparent') {
    //         city.style = transparentStyle;
    //     }
    // }
    // tileStyle.addEventListener('change', set3DTileStyle);

    //////////////////////////////////////////////////////////////////////////
    // Custom mouse interaction for highlighting and selecting
    //////////////////////////////////////////////////////////////////////////

    // If the mouse is over a point of interest, change the entity billboard scale and color
    var previousPickedEntity;
    var handler = viewer.screenSpaceEventHandler;
    handler.setInputAction(function (movement) {
        var pickedPrimitive = viewer.scene.pick(movement.endPosition);
        var pickedEntity = Cesium.defined(pickedPrimitive) ? pickedPrimitive.id : undefined;
        // Unhighlight the previously picked entity
        if (Cesium.defined(previousPickedEntity)) {
            previousPickedEntity.billboard.scale = 1.0;
            previousPickedEntity.billboard.color = Cesium.Color.WHITE;
        }
        // Highlight the currently picked entity
        if (Cesium.defined(pickedEntity) && Cesium.defined(pickedEntity.billboard)) {
            pickedEntity.billboard.scale = 2.0;
            // pickedEntity.billboard.color = Cesium.Color.ORANGERED;
            previousPickedEntity = pickedEntity;
        }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

    //////////////////////////////////////////////////////////////////////////
    // Setup Camera Modes
    //////////////////////////////////////////////////////////////////////////

    // var freeModeElement = document.getElementById('freeMode');
    // var droneModeElement = document.getElementById('droneMode');

    // Create a follow camera by tracking the drone entity
    function setViewMode() {
        if (droneModeElement.checked) {
            viewer.trackedEntity = drone;
        } else {
            viewer.trackedEntity = undefined;
            viewer.scene.camera.flyTo(homeCameraView);
        }
    }

    // freeModeElement.addEventListener('change', setViewMode);
    // droneModeElement.addEventListener('change', setViewMode);

    // viewer.trackedEntityChanged.addEventListener(function() {
    //    if (viewer.trackedEntity === drone) {
    //        freeModeElement.checked = false;
    //        droneModeElement.checked = true;
    //    }
    // });

    //////////////////////////////////////////////////////////////////////////
    // Setup Display Options
    //////////////////////////////////////////////////////////////////////////

    // var shadowsElement = document.getElementById('shadows');
    // var neighborhoodsElement =  document.getElementById('neighborhoods');

    // shadowsElement.addEventListener('change', function (e) {
    //     viewer.shadows = e.target.checked;
    // });

    // neighborhoodsElement.addEventListener('change', function (e) {
    //     neighborhoods.show = e.target.checked;
    //     tileStyle.value = 'transparent';
    //     city.style = transparentStyle;
    // });

    // Finally, wait for the initial city to be ready before removing the loading indicator.
    var loadingIndicator = document.getElementById('loadingIndicator');
    loadingIndicator.style.display = 'block';
    city.readyPromise.then(function () {
        loadingIndicator.style.display = 'none';
    });

//获取中心点
     function parseGeoJson(filepath){
         var geojsonOptions = { clampToGround : true };
         var promise = Cesium.GeoJsonDataSource.load(filepath, geojsonOptions);
         var sanming_map = {};
         promise.then(function(dataSource) {
               viewer.dataSources.add(dataSource); 
               var entities = dataSource.entities.values;
               //console.log(entities);
               for (var i = 0; i < entities.length; i++) {
                    var entity = entities[i];
                    if (Cesium.defined(entity.polygon)) {
                        entity.name = entity.properties.name; 
                        if(sanming_map[entity.name]){
                            sanming_map[entity.name].push(entity);
                        }
                        else{
                            sanming_map[entity.name] = [];
                            sanming_map[entity.name].push(entity);

                        }
                    }
               }

               var itemSet = {};
               for (var n in sanming_map) {
                    var items = sanming_map[n];
                    if(items.length > 0){
                       var myPolyCenter = new Cesium.Cartesian3(0,0,0);
                       for (var i = 0; i < items.length; i++){
                            var item = items[i];
                            var polyPositions = item.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                            var polyCenter = Cesium.BoundingSphere.fromPoints(polyPositions).center;
                            polyCenter = Cesium.Ellipsoid.WGS84.scaleToGeodeticSurface(polyCenter);
                            //console.log(items.length+","+polyCenter);

                            myPolyCenter.x += polyCenter.x;
                            myPolyCenter.y += polyCenter.y;
                            myPolyCenter.z += polyCenter.z;
                        }
                        myPolyCenter.x /= items.length;
                        myPolyCenter.y /= items.length;
                        myPolyCenter.z /= items.length;
                        items[0].position = myPolyCenter;
                        itemSet[n] = items[0];

                    }
               }
               console.log(itemSet);
               for (var n in itemSet) {
                       var sitem = itemSet[n];
                       sitem.polygon.material = Cesium.Color.fromRandom({
                                    red : 0.1,
                                    maximumGreen : 0.7,
                                    minimumBlue : 0.5,
                                    alpha : 0.7
                        });
                        sitem.polygon.distanceDisplayCondition = new Cesium.DistanceDisplayCondition(10, 800000);
                        sitem.label = {
                            text : sitem.name,
                            showBackground : true,
                            scale : 0.6,
                            horizontalOrigin : Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
                            distanceDisplayCondition : new Cesium.DistanceDisplayCondition(100.0, 800000),
                            disableDepthTestDistance : Number.POSITIVE_INFINITY
                        }; 
               }
               console.log(itemSet);
         });
        
     }
    
      //经纬度坐标转为笛卡尔空间直角坐标系(即ＧＰＳ卫星返回的坐标)
    function cartographicToCartesian(){
        var ellipsoid = viewer.scene.globe.ellipsoid;
        var cartographic = Cesium.Cartographic.fromDegrees(lng,lat,alt);
        var cartesian3 = ellipsoid.cartographicToCartesian(cartographic);
        var x = cartesian3.x;   var y= cartesian3.y;   var z= cartesian3.z;
    }
    //笛卡尔空间直角坐标(Cartesian3)系转为经纬度坐标(cartograhphic)
    function cartesianToCartographic(cartesian3){
        var ellipsoid = Cesium.Ellipsoid.WGS84; //iewer.scene.globe.ellipsoid;
        // console.log(ellipsoid);
        //var cartesian3 = new Cesium.Cartesian3(x,y,z);
        var cartographic = ellipsoid.cartesianToCartographic(cartesian3);
        var latitude = Cesium.Math.toDegrees(cartographic.latitude);
        var longitude = Cesium.Math.toDegrees(cartographic.longitude);
        var alt = cartographic.height;
         console.log(latitude+","+longitude+","+alt);
        var x = {
            latitude: latitude,
            longitude:longitude
        }
        return x
        
        // console.log(cartographic);
    }

          //摄像头移动
    function moveCamera(
        bycPosition = new Cesium.Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 2631.082799425431),
        nycOrientation = new Cesium.HeadingPitchRoll.fromDegrees(7.1077496389876024807, -31.987223091598949054, 0.025883251314954971306)
        ){
        //var bycPosition = new Cesium.Cartesian3.fromDegrees(-73.998114468289017509, 40.674512895646692812, 2631.082799425431);
        //var nycOrientation = new Cesium.HeadingPitchRoll.fromDegrees(7.1077496389876024807, -31.987223091598949054, 0.025883251314954971306);
        var nycView = {
                destination : bycPosition,
                orientation : {
                    heading : nycOrientation.heading,
                    pitch : nycOrientation.pitch,
                    roll : nycOrientation.roll
                }
            };
            // Set the initial view
            viewer.scene.camera.setView(nycView);
            // Add some camera flight animation options
            nycView.duration = 2.0;
            nycView.maximumHeight = 2000;
            nycView.pitchAdjustHeight = 2000;
            nycView.endTransform = Cesium.Matrix4.IDENTITY;
            viewer.scene.camera.flyTo(nycView);
    };

    $('.data-table').on('click', '.gkinfo-list a', function(){
        var name = $(this).text()
         sanmingPromise.then(function(dataSource) {
            var sanming_neighborhoodEntities = dataSource.entities.values;
            for (var i = 0; i < sanming_neighborhoodEntities.length; i++) {
                var sanming_entity = sanming_neighborhoodEntities[i];
                var city_name= sanming_entity.name._value;
                // console.log(sanming_entity.polygon)
                if (Cesium.defined(sanming_entity.polygon) && name==city_name) {
                    // console.log(sanming_entity)
                    var sanming_polyPositions = sanming_entity.polygon.hierarchy.getValue(Cesium.JulianDate.now()).positions;
                    console.log(sanming_polyPositions.length)
                    var x  =cartesianToCartographic(sanming_polyPositions[0])

                   
                    // var p = Cesium.Cartesian3.fromArray(sanming_polyPositions);
                                        // console.log(p)

console.log(x.longitude, y.latitude)
                    moveCamera(new Cesium.Cartesian3.fromDegrees(x.longitude,y.latitude, 52631.082799425431) );

                }

            }



         })

    })

}());
