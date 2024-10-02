"use client";

import { Button } from "@/components/ui/button";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import GuidelineLayout from "@/app/layouts/GuidelineLayout";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Category } from "@/types/type";
import { Chips } from "@/components/Chips";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

import Selector from "@/components/services/Selector";
import ServiceInput from "@/components/services/ServiceInput";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  fetchService,
  getIndustries,
  handleSelectIndustry,
  resetServiceState,
  selectLoading,
  selectService,
  selectSingleSubCategory,
  handleAddSubCategory,
  handleCategory,
  handleSingleSubCategory,
  handleRemoveSubCategory,
  handleCurrentSubCategory,
  handleAddNestedSubCategory,
  handleAddKeyword,
  handleRemoveKeyword,
  setSubCategoryLevel1Index,
  setSubCategoryLevel2Index,
  setSubCategoryLevel3Index,
  setSubCategoryLevel4Index,
  selectSubCategoryLevel1Index,
  selectSubCategoryLevel2Index,
  selectSubCategoryLevel3Index,
  selectSubCategoryLevel4Index,
  saveService,
  handleSetType,
} from "@/store/Slices/ServiceSlice";
import { useParams, useRouter } from "next/navigation";

export default function InterestSubpage() {
  const params = useParams();
  const router = useRouter();
  const serviceId = Array.isArray(params.id) ? params.id[0] : params.id;

  const dispatch = useDispatch<AppDispatch>();
  const service = useSelector(selectService);
  const loading = useSelector(selectLoading);
  const singleSubCategory = useSelector(selectSingleSubCategory);
  const industries = useSelector(
    (state: RootState) => state.service.industries
  );
  const state = useSelector((state: RootState) => state.service);

  const [singleKeyword, setSingleKeyword] = useState<string>("");
  const [subCategoryIndex, setSubCategoryIndex] = useState<number>(0);
  const [nestedSubCategoryInputs, setNestedSubCategoryInputs] = useState<{
    [key: number]: string;
  }>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const fetchData = useCallback(() => {
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

  const fetchIndustries = useCallback(() => {
    dispatch(getIndustries());
    dispatch(handleSetType("interest"));
  }, [dispatch]);

  useEffect(() => {
    fetchIndustries();
  }, [fetchIndustries]);

  const handleSelectIndustryChange = (value: string) => {
    const industryId = industries.find(
      (industry: { name: string }) => industry.name === value
    )?._id;
    dispatch(handleSelectIndustry(industryId));
  };

  const handleCategoryChange = (value: string) => {
    dispatch(handleCategory(value));
  };

  const handleSingleSubCategoryChange = (value: string) => {
    dispatch(handleSingleSubCategory(value));
  };

  const handleAddSubCategoryClick = () => {
    dispatch(handleAddSubCategory(singleSubCategory));
  };

  const handleRemoveSubCategoryClick = (value: string) => {
    dispatch(handleRemoveSubCategory(value));
  };

  const handleCurrentSubCategoryClick = (index: number) => {
    dispatch(handleCurrentSubCategory(index));
    setSubCategoryIndex(index);
  };

  const handleSingleKeywordChange = (value: string) => {
    setSingleKeyword(value);
  };

  const handleNestedSubCategoryChange = (value: string, level: number) => {
    setNestedSubCategoryInputs((prev) => ({ ...prev, [level]: value }));
  };

  const handleAddKeywordClick = () => {
    dispatch(handleAddKeyword({ subCategoryIndex, value: singleKeyword }));
    setSingleKeyword("");
  };

  const handleRemoveKeywordClick = (index: number, name: string) => {
    dispatch(handleRemoveKeyword({ subCategoryIndex, value: name }));
  };

  const handleAddNestedSubCategoryClick = (level: number) => {
    if (!nestedSubCategoryInputs[level]) {
      toast.warning(`Please select level ${level + 1} category`);
      return;
    }
    
    dispatch(
      handleAddNestedSubCategory({
        parentIndex: subCategoryIndex,
        value: nestedSubCategoryInputs[level],
        level,
      })
    );
    setNestedSubCategoryInputs("");
  };

  function getLevelIndex(level: number, state: any): number {
    switch (level) {
      case 0:
        return state.subCategoryLevel1Index;
      case 1:
        return state.subCategoryLevel2Index;
      case 2:
        return state.subCategoryLevel3Index;
      default:
        return -1;
    }
  }

  function getNestedSubCategoryTitle(
    service: any,
    subCategoryIndex: number,
    level: number
  ): string {
    let category = service?.subCategories[subCategoryIndex];
    for (let i = 0; i < level; i++) {
      if (category?.subCategories?.length > 0) {
        category = category.subCategories[getLevelIndex(i, state)];
      } else {
        return "";
      }
    }
    return category?.title || "";
  }

  function getNestedSubCategories(
    service: any,
    subCategoryIndex: number,
    level: number
  ): any[] {
    let category = service?.subCategories[subCategoryIndex];
    for (let i = 0; i < level; i++) {
      if (category?.subCategories?.length > 0) {
        category = category.subCategories[getLevelIndex(i, state)];
      } else {
        return [];
      }
    }
    return category?.subCategories || [];
  }

  function handleLevelIndexChange(level: number, index: number) {
    switch (level) {
      case 0:
        dispatch(setSubCategoryLevel1Index(index));
        break;
      case 1:
        dispatch(setSubCategoryLevel2Index(index));
        break;
      case 2:
        dispatch(setSubCategoryLevel3Index(index));
        break;
      case 3:
        dispatch(setSubCategoryLevel4Index(index));
        break;
    }
  }

  const handleSaveService = () => {
    // dispatch(saveService({ service }))
    //   .unwrap()
    //   .then(() => {
    //     router.push('/services');
    //   })
    //   .catch((error) => {
    //     console.error("Failed to save service:", error);
    //   });
  };

  console.log(service);

  return (
    <DashboardLayout>
      <GuidelineLayout>
        <div className="bg-white mr-2 rounded-md border border-border px-[1.75em] py-[1.438em]">
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-[1.875em] leading-[2.813] font-bold">
              Interest / Categories
            </h1>
            <Button
              className="w-[7.75rem] h-[2.375rem] text-[0.875rem] leading-[1.25rem] font-medium bg-PrimaryColor rounded-full"
              onClick={handleSaveService}
            >
              Save
            </Button>
          </div>
          <div>
            <div>
              <h4 className="text-[0.625rem] leading-[0.938rem] font-normal">
                Industry Group
              </h4>
              <Selector
                options={industries}
                placeholder="Industry"
                onChange={handleSelectIndustryChange}
              />
            </div>

            <ServiceInput title="Category" onChange={handleCategoryChange} />
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
              {service?.subCategories?.map((item: any, index: number) => (
                <Chips
                  key={item?.title}
                  id={index}
                  text={item?.title}
                  selected={subCategoryIndex}
                  isSubCategory={true}
                  onSubCategoryClick={handleRemoveSubCategoryClick}
                  currentSelected={handleCurrentSubCategoryClick}
                />
              ))}
            </div>

            <Tabs defaultValue="keywords" className="flex flex-col mt-10">
              <TabsList className="grid grid-cols-2 h-[2.771em] mb-[0.458em] p-0 bg-muted-none shadow-none">
                <TabsTrigger
                  value="keywords"
                  className="h-[46px] text-[1.083rem] leading-[1.203rem] py-[0.75rem] rounded-r-none m-0 bg-white data-[state=active]:bg-PrimaryColor data-[state=active]:text-white data-[state=active]:border-none border-y border-l border-border"
                >
                  Keywords
                </TabsTrigger>
                <TabsTrigger
                  value="nestedSubCategory"
                  className="h-[46px] text-[1.083rem] leading-[1.203rem] py-[0.75rem] rounded-l-none p-0 m-0 bg-white data-[state=active]:bg-PrimaryColor data-[state=active]:text-white data-[state=active]:border-none border-y border-r border-border"
                >
                  Nested Sub Category
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="keywords"
                className="m-0 p-0 flex-grow flex flex-col"
              >
                <div className="mt-10 mb-2">
                  <h4 className="text-[1.5rem] leading-[0.938rem] font-normal">
                    Add keywords for
                    <span className="text-PrimaryColor ml-1">
                      {service?.subCategories[subCategoryIndex]?.title}
                    </span>
                  </h4>
                </div>

                <ServiceInput
                  title="Keyword"
                  value={singleKeyword}
                  onChange={handleSingleKeywordChange}
                />
                <div className="flex justify-end">
                  <Button
                    className="w-[10.625rem] h-[2.375rem] text-[0.875rem] leading-[1.25rem] font-medium bg-PrimaryColor rounded-full"
                    onClick={handleAddKeywordClick}
                  >
                    Add keywords
                  </Button>
                </div>
                <div className="flex flex-wrap gap-5 mt-6">
                  {service?.subCategories[subCategoryIndex]?.keyWords?.map(
                    (keyword: string, index: number) => (
                      <Chips
                        key={keyword}
                        id={index}
                        text={keyword}
                        selected={subCategoryIndex}
                        isSubCategory={false}
                        onKeywordClick={(index, name) => handleRemoveKeywordClick(index, name)}
                      />
                    )
                  )}
                </div>
              </TabsContent>
              <TabsContent value="nestedSubCategory">
                {[0, 1, 2, 3].map((level) => (
                  <div key={level}>
                    <div className="mt-10 mb-2 flex justify-between">
                      <h4 className="text-[1.5rem] leading-[0.938rem] font-normal">
                        Add sub category to
                        <span className="text-PrimaryColor ml-1">
                          {getNestedSubCategoryTitle(
                            service,
                            subCategoryIndex,
                            level
                          )}
                        </span>
                      </h4>
                      <h4 className="text-[1.5rem] leading-[0.938rem] font-normal">
                        Level {level + 1}
                      </h4>
                    </div>

                    <ServiceInput
                      value={nestedSubCategoryInputs[level]}
                      onChange={(value) =>
                        handleNestedSubCategoryChange(value, level)
                      }
                    />
                    <div className="mt-5 flex justify-end">
                      <Button
                        className="w-[10.625rem] h-[2.375rem] text-[0.875rem] leading-[1.25rem] font-medium bg-PrimaryColor rounded-full"
                        onClick={() => handleAddNestedSubCategoryClick(level)}
                      >
                        Add Sub Category
                      </Button>
                    </div>

                    <div className="w-full flex flex-wrap gap-5 mt-6">
                      {getNestedSubCategories(
                        service,
                        subCategoryIndex,
                        level
                      ).map((item: any, index: number) => (
                        <Chips
                          key={item?.title}
                          id={index}
                          text={item?.title}
                          selected={getLevelIndex(level, state)}
                          isSubCategory={true}
                          onSubCategoryClick={handleRemoveSubCategoryClick}
                          currentSelected={(index) =>
                            handleLevelIndexChange(level, index)
                          }
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </GuidelineLayout>
    </DashboardLayout>
  );
}
