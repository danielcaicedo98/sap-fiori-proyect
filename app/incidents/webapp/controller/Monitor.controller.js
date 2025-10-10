sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  return Controller.extend("ns.incidents.controller.Monitor", {
    onInit: function () {
      const frontImg = this.byId("imgFront");
      const backImg = this.byId("imgBack");
      const frontStatus = this.byId("statusFront");
      const backStatus = this.byId("statusBack");
      const pesoText = this.byId("pesoText");
      const pesoStatus = this.byId("statusPeso");

      // Cámara frontal
      const wsFront = new WebSocket("ws://localhost:4000");
      wsFront.binaryType = "arraybuffer";

      wsFront.onopen = () => frontStatus.setText("✅ Cámara frontal conectada");
      wsFront.onclose = () => frontStatus.setText("❌ Cámara frontal desconectada");
      wsFront.onerror = () => frontStatus.setText("⚠️ Error cámara frontal");
      wsFront.onmessage = (e) => {
        const blob = new Blob([e.data], { type: "image/jpeg" });
        frontImg.setSrc(URL.createObjectURL(blob));
      };

      // Cámara trasera
      const wsBack = new WebSocket("ws://localhost:4001");
      wsBack.binaryType = "arraybuffer";

      wsBack.onopen = () => backStatus.setText("✅ Cámara trasera conectada");
      wsBack.onclose = () => backStatus.setText("❌ Cámara trasera desconectada");
      wsBack.onerror = () => backStatus.setText("⚠️ Error cámara trasera");
      wsBack.onmessage = (e) => {
        const blob = new Blob([e.data], { type: "image/jpeg" });
        backImg.setSrc(URL.createObjectURL(blob));
      };

      // Peso
      const wsPeso = new WebSocket("ws://localhost:8765");
      wsPeso.onopen = () => pesoStatus.setText("✅ Conectado a báscula");
      wsPeso.onclose = () => pesoStatus.setText("❌ Desconectado de báscula");
      wsPeso.onerror = () => pesoStatus.setText("⚠️ Error de conexión con báscula");
      wsPeso.onmessage = (e) => {
        pesoText.setText(e.data + " kg");
      };
    },
  });
});
