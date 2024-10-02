"use client";

import { Button } from "@/components/ui/button";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import GuidelineLayout from "@/app/layouts/GuidelineLayout";
import { useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { SubServices } from "@/types/type";
import { Chips } from "@/components/Chips";
import ServiceInput from "@/components/services/ServiceInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/store/store";
import {
  fetchService,
  saveService,
  editService,
  handleAddSubCategory,
  handleCategory,
  handleSingleSubCategory,
  handleRemoveSubCategory,
  handleCurrentSubCategory,
  selectService,
  selectLoading,
  selectSingleSubCategory,
  resetServiceState,
  handleSetType,
  addSubService,
  deleteSubService,
} from "@/store/Slices/ServiceSlice";
import { useParams } from "next/navigation";
import { deleteService } from "@/api";

export default function VolunteerSubpage() {
  const params = useParams();
  const serviceId = Array.isArray(params.id) ? params.id[0] : params.id;

  const dispatch = useDispatch<AppDispatch>();
  const service = useSelector(selectService);
  const loading = useSelector(selectLoading);
  const singleSubCategory = useSelector(selectSingleSubCategory);

  const fetchData = useCallback(() => {
    dispatch(handleSetType("volunteer"));
    if (serviceId !== "add") {
      dispatch(fetchService(serviceId));
    }
  }, [dispatch, serviceId]);

  useEffect(() => {
    fetchData();

    return () => {
      dispatch(resetServiceState());
    };
  }, [fetchData, dispatch]);

  const handleAddSubCategoryClick = () => {
    dispatch(handleAddSubCategory(singleSubCategory));

    const body = {
      title: singleSubCategory,
    };
    dispatch(addSubService({ serviceId, body }));
  };

  const handleCategoryChange = (value: string) => {
    dispatch(handleCategory(value));
  };

  const handleSingleSubCategoryChange = (value: string) => {
    dispatch(handleSingleSubCategory(value));
  };

  const handleRemoveSubCategoryClick = (value: string) => {
    const subCategory = service.subCategories.find(
      (category: SubServices) => category.title === value
    );
    console.log(subCategory._id, subCategory.parent);
    const body = {
      title: subCategory.title,
    };

    dispatch(
      deleteSubService({
        serviceId,
        id: subCategory._id,
        body,
      })
    );
    dispatch(handleRemoveSubCategory(value));
  };

  const handleCurrentSubCategoryClick = (index: number) => {
    dispatch(handleCurrentSubCategory(index));
  };

  const handleSave = () => {
    if (serviceId !== "add") {
      dispatch(
        saveService({
          service: service,
        })
      );
    } else {
      dispatch(
        editService({
          service: service,
          id: serviceId,
        })
      );
    }

    console.log("Saving service:", service);
    toast.success("Service saved successfully");
  };

  console.log(service);

  return (
    <DashboardLayout>
      <GuidelineLayout>
        <div>
          <div className="bg-white h-full mr-2 rounded-md border border-border px-[1.75em] py-[1.438em] ">
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-[1.875em] leading-[2.813] font-bold">
                Volunteer
              </h1>
              <Button
                className="w-[7.75rem] h-[2.375rem] text-[0.875rem] leading-[1.25rem] font-medium bg-PrimaryColor rounded-full"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>

            <ServiceInput
              title="Category"
              value={service.title}
              onChange={handleCategoryChange}
            />
            <ServiceInput
              title="Sub Category"
              value={singleSubCategory}
              onChange={handleSingleSubCategoryChange}
            />
            <div className="mt-5 flex justify-end">
              <Button
                className="w-[10.625rem] h-[2.375rem] text-[0.875rem] leading-[1.25rem] font-medium bg-PrimaryColor rounded-full"
                onClick={handleAddSubCategoryClick}
              >
                Add Sub Category
              </Button>
            </div>

            <div className="w-full flex flex-wrap gap-5 mt-6">
              {service?.subCategories &&
                service.subCategories.map(
                  (item: SubServices, index: number) => (
                    <Chips
                      key={item.title}
                      id={index}
                      text={item.title}
                      isSubCategory={true}
                      onSubCategoryClick={handleRemoveSubCategoryClick}
                      currentSelected={handleCurrentSubCategoryClick}
                    />
                  )
                )}
            </div>
          </div>
        </div>
      </GuidelineLayout>
    </DashboardLayout>
  );
}
