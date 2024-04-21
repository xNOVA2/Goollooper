"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import GuidelineLayout from "../layouts/GuidelineLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import Editor from "@/components/Editor/Editor";
import { Button } from "@/components/ui/button";

import { addGuidline, getGuidline, updateGuidline } from "@/api";

export default function TermsPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [termsAndCondition, setTermsAndCondition] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      let termsRes = await getGuidline(2);
      if (termsRes?.data?.data?.length) {
        setTermsAndCondition(termsRes?.data?.data[0]?.content);
        setId(termsRes?.data?.data[0]?._id);
      }
      setLoading(false);
    } catch (error: Error | any) {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    if (!termsAndCondition) {
      toast.warning("Please type terms and condition");
      return;
    }
    try {
      setLoading(true);
      let data = {
        type: 2,
        content: termsAndCondition,
      };
      let termsRes: any;
      if (id) {
        termsRes = await updateGuidline(id, data);
      } else {
        termsRes = await addGuidline(data);
      }

      if (termsRes?.data?.status) {
        toast.success(termsRes?.data?.msg);
        setLoading(false);
      } else {
        toast.warning(termsRes?.data?.msg);
      }
    } catch (error: Error | any) {
      setLoading(false);
      if (typeof error?.response?.data?.data === "object") {
        error?.response?.data?.data?.map((err: string) => {
          toast.error(err);
        });
      } else {
        toast.error(error?.response?.data?.msg);
      }
    }
  };

  return (
    <DashboardLayout Active={5}>
      <GuidelineLayout>
        <div className="bg-white h-[450px] mx-4 rounded-md overflow-y-scroll">
          <Editor value={termsAndCondition} onChange={setTermsAndCondition} />
        </div>
        <Button
          className="rounded-full bg-PrimaryColor float-right mr-10 mt-10 w-40"
          onClick={onSubmit}
        >
          {id ? "Update" : "Add"}
        </Button>
      </GuidelineLayout>
    </DashboardLayout>
  );
}
