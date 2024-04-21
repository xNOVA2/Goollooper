"use client";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import DashboardLayout from "@/app/layouts/DashboardLayout";
import GuidelineLayout from "@/app/layouts/GuidelineLayout";
import Editor from "@/components/Editor/Editor";
import { Button } from "@/components/ui/button";

import { addGuidline, getGuidline, updateGuidline } from "@/api";

export default function FaqPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [faq, setFaq] = useState<string>("");
  const [id, setId] = useState<string>("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      let faqRes = await getGuidline(3);
      if (faqRes?.data?.data?.length) {
        setFaq(faqRes?.data?.data[0]?.content);
        setId(faqRes?.data?.data[0]?._id);
      }
      setLoading(false);
    } catch (error: Error | any) {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    if (!faq) {
      toast.warning("Please type terms and condition");
      return;
    }
    try {
      setLoading(true);
      let data = {
        type: 3,
        content: faq,
      };
      let faqRes: any;
      if (id) {
        faqRes = await updateGuidline(id, data);
      } else {
        faqRes = await addGuidline(data);
      }

      if (faqRes?.data?.status) {
        toast.success(faqRes?.data?.msg);
        setLoading(false);
      } else {
        toast.warning(faqRes?.data?.msg);
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
    <DashboardLayout>
      <GuidelineLayout>
        <div className="bg-white h-[450px] mx-4 rounded-md overflow-y-scroll">
          <Editor value={faq} onChange={setFaq} />
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
