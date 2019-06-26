describe("Given Presentation Maps", () => {
  let view = null;
  describe("with an instance of MapView", () => {
    beforeEach(() => {
      view = new Maps.MapView();
    });

    afterEach(() => {
      //view.remove();
      view = null;
    });

    it("is defined", async () => {
      expect(Maps.MapView).to.not.be.undefined;
    });
    it("can create an instance", () => {
      expect(view).to.not.be.undefined;
    });
  });
  describe("with an instance of HeatMapView", () => {
    beforeEach(() => {
      view = new Maps.HeatMapView();
    });

    afterEach(() => {
      //view.remove();
      view = null;
    });

    it("is defined", async () => {
      expect(Maps.HeatMapView).to.not.be.undefined;
    });
    it("can create an instance", () => {
      expect(view).to.not.be.undefined;
    });
  });
});
