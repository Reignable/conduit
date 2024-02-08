import { TestBed } from "@angular/core/testing";
import { AppComponent } from "./app.component";
import { render, screen } from "@testing-library/angular";

describe("AppComponent", () => {
  it("should create the app", async () => {
    const fixture = await render(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'angular-template' title`, async () => {
    const fixture = await render(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual("angular-template");
  });

  it("should render title", async () => {
    await render(AppComponent);
    expect(screen.getByRole("heading").textContent).toContain(
      "Hello, angular-template"
    );
  });
});
