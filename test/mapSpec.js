describe("Given Presentation Maps", () => {
  describe("with an instance of HeatMapView", () => {
    let view = null;

    beforeEach(() => {
      //view = new Maps.HeatMapView();
    });

    afterEach(() => {
      //view.remove();
      view = null;
    });

    it("is defined", async () => {
      await console.debug("maps", Maps);
      expect(Maps).to.not.be.undefined;
    });
    it("can create an instance", () => {
      expect(view).to.not.be.undefined;
    });
  });
});
