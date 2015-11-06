angular.module('app', []);

angular.module('app').controller('GraphController', ['$scope', 'JSONConstant', function($scope, JSONConstant){

    angular.extend($scope, {
      showConnections: true,
      nodes: JSONConstant.data.nodeDataArray
    });

    // Configuração - CSS
    var $ = go.GraphObject.make,
        yellowgrad = $(go.Brush, "Linear", { 0: "rgb(254, 201, 0)", 1: "rgb(254, 162, 0)" }),
        redgrad = $(go.Brush, "Linear", { 0: "#C45245", 1: "#7D180C" }),
        bigfont = "bold 13pt Helvetica, Arial, sans-serif";

    function textStyle() {
      return {
        margin: 6,
        wrap: go.TextBlock.WrapFit,
        textAlign: "center",
        editable: false,
        font: bigfont
      }
    }

    // Configuração - GoJS
    myDiagram = $(go.Diagram, "all", {
      "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
      allowDrop: true,
      initialAutoScale: go.Diagram.Uniform,
      "linkingTool.direction": go.LinkingTool.ForwardsOnly,
      initialContentAlignment: go.Spot.Center,
      layout: $(go.LayeredDigraphLayout, {
        isInitial: false,
        isOngoing: false,
        layerSpacing: 25,
      }),
      "undoManager.isEnabled": false
    });

    // Configuração - Template
    myDiagram.nodeTemplate = $(go.Node, "Auto",
      new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
      $(go.Shape, "Rectangle", {
          fill: yellowgrad,
          stroke: "black",
          portId: "",
          fromLinkable: false,
          toLinkable: false,
          cursor: "pointer",
          toEndSegmentLength: 50,
          fromEndSegmentLength: 40
      }),
      $(go.Panel, "Vertical",
        $(go.TextBlock, {
          text: "textAlign: 'left'",
          margin: 6,
          font: bigfont
        }, new go.Binding("text", "title").makeTwoWay()),
        $(go.Panel, "Vertical", {
          itemTemplate: $(go.Panel, "Horizontal", $(go.TextBlock, textStyle(),
            new go.Binding("text", "text").makeTwoWay())
          )},
          new go.Binding("itemArray", "arrayList").makeTwoWay()
        )
      )
    );

     myDiagram.nodeTemplateMap.add("RedEvent",
      $(go.Node, "Auto",
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "Rectangle", {
          fill: redgrad,
          stroke: "black",
          portId: "",
          fromLinkable: false,
          toLinkable: false,
          cursor: "pointer",
          toEndSegmentLength: 50,
          fromEndSegmentLength: 40
        }),
        $(go.Panel, "Vertical",
          $(go.TextBlock, "Drop", textStyle(), {
            stroke: "whitesmoke"
          }, new go.Binding("text", "title").makeTwoWay()),
          $(go.Panel, "Vertical", {
            itemTemplate: $(go.Panel, "Horizontal", $(go.TextBlock, textStyle(), {
              stroke: "whitesmoke"
            }, new go.Binding("text", "text").makeTwoWay()))},
            new go.Binding("itemArray", "arrayList").makeTwoWay()
          )
        )
      )
    );

    // Configuração - Conexões
    myDiagram.linkTemplate =
      $(go.Link,
        new go.Binding("points").makeTwoWay(), {
          curve: go.Link.Bezier,
          toShortLength: 15
        },
        new go.Binding("curviness", "curviness"),
        $(go.Shape, {
          stroke: "#2F4F4F",
          strokeWidth: 2.5,
        }, new go.Binding("stroke", "color"), new go.Binding("strokeWidth", "width")),
        $(go.Shape, {
          toArrow: "kite",
          fill: "#2F4F4F",
          stroke: null,
          scale: 2
        }, new go.Binding("fill", "color"))
        /*$(go.Panel, "Auto",
          $(go.Shape, {
            fill: $(go.Brush, "Radial", {
              0: "white",
              0.3: "white",
              1: "white"
            }),
            stroke: null
          }),
          $(go.TextBlock, "", {
            textAlign: "center",
            stroke: "black",
            margin: 4
          }, new go.Binding("text", "text").makeTwoWay())
        )*/
    );

    myDiagram.model = go.Model.fromJson(JSONConstant.data);
    myDiagram.layoutDiagram(true);

    $scope.changeConnections = function(show){
      myDiagram.model.nodeDataArray.forEach(function(itemModel){
        myDiagram.findNodeForData(itemModel).linksConnected.each(function(itemNode){
          itemNode.visible = show;
        })
      })
    }

}]);

angular.module('app').constant('JSONConstant', {
  data: {
    "nodeDataArray": [],
    "linkDataArray": []
  }
});

angular.element(document).ready(function() {

  $('.ui.search').dropdown({
    message: {
      noResults: 'Nenhum item encontrado.'
    }
  });

	angular.bootstrap(document, ['app']);
});

