"use client";
import React from "react";
import GooglePlacesAutocomplete, {
  getLatLng,
  geocodeByPlaceId,
} from "react-google-places-autocomplete";

import { cn } from "@/lib/utils";

interface GooglePlacesAutocompleteProps {
  className?: string;
  onSelect?: any;
}

const GooglePlacesAutocompleteWrapper = React.forwardRef<
  HTMLInputElement,
  GooglePlacesAutocompleteProps
>(({ className, onSelect, ...props }, ref) => {
  const handleSelect = async (value: any) => {
    if (onSelect) {
      const results = await geocodeByPlaceId(value.value.place_id);
      const latLng = await getLatLng(results[0]);
      let state = extractAddressComponent(
        results[0],
        "administrative_area_level_1"
      );
      let city = extractAddressComponent(results[0], "locality");
      let country = extractAddressComponent(results[0], "country");
      onSelect({ ...value, state, city, country, latLng });
    }
  };

  const extractAddressComponent = (result: any, componentType: string) => {
    const component = result.address_components.find(
      (component: any) => component.types.indexOf(componentType) !== -1
    );
    return component ? component.long_name : "";
  };

  return (
    <div className={cn("relative", className)}>
      <GooglePlacesAutocomplete
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}
        {...props}
        selectProps={{
          onChange: handleSelect,
        }}
        minLengthAutocomplete={3}
        debounce={500}
      />
    </div>
  );
});

GooglePlacesAutocompleteWrapper.displayName = "GooglePlacesAutocompleteWrapper";

export default GooglePlacesAutocompleteWrapper;
