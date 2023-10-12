//Testing library react
import { render, screen } from "@testing-library/react";

//Components
import Resize from "../Pages/Resize";
import CropImage from "../Pages/CropImage";
import Home from "../Pages/Home";

//Tanstack
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
const queryClient = new QueryClient();

describe("Test Renders", () => {
  test("The component Resize is succesfully charged", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Resize />
      </QueryClientProvider>
    );
    expect(screen.getByText(/Resizing/i)).toBeDefined();
  });

  test("The component Crop is succesfully charged", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CropImage />
      </QueryClientProvider>
    );
    expect(screen.getByText(/Cropping/i)).toBeDefined();
  });

  test("The component Home is succesfully charged", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    );
    expect(screen.getByText(/Thumbnail/i)).toBeDefined();
  });
});
