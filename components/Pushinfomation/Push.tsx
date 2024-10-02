"use client";
import SelectInput from "../SelectInput/SelectInput";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Option {
  value: string;
  label: string;
}

export default function PushInfomation({
  selectedCheckbox,
  setSelectedCheckbox,
  options,
  loading,
  userLoading,
  setSearch,
  handleChange,
  title,
  setTitle,
}: {
  selectedCheckbox: string;
  setSelectedCheckbox: (value: string) => void;
  options: Option[];
  loading: boolean;
  userLoading: boolean;
  setSearch: (value: string) => void;
  handleChange: any;
  title: string;
  setTitle: (value: string) => void;
}) {
  return (
    <>
      <div>
        <div className="pt-[1.438em]">
          <div className="flex items-center space-x-10 ">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                className="w-[1.063em] h-[1.063em] rounded-md border-border data-[state=checked]:bg-PrimaryColor"
                checked={selectedCheckbox === "all"}
                onCheckedChange={() => setSelectedCheckbox("all")}
              />
              <Label htmlFor="terms">All users <span className="text-PrimaryColor">*</span></Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                className="w-[1.063em] h-[1.063em] rounded-md border-border data-[state=checked]:bg-PrimaryColor"
                checked={selectedCheckbox === "selected"}
                onCheckedChange={() => setSelectedCheckbox("selected")}
              />
              <Label htmlFor="terms">Selected Taskers <span className="text-PrimaryColor">*</span></Label>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[2em]">
        <div className="relative">
          <p className="absolute text-xm text-PrimaryColor pl-[1.313rem] mt-2">Title <span className="text-PrimaryColor">*</span></p>
          <div className="flex">
            <Input
              type="text"
              placeholder="Title here"
              className="h-16 rounded-lg bg-InputFieldColor pl-[1.313rem] pt-7 text-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="absolute"></div>
          </div>
        </div>
        { selectedCheckbox === "selected" && (
          <div className="relative mt-[1.5em] ">
            <p className="absolute text-xm text-PrimaryColor mb-2">To <span className="text-PrimaryColor">*</span></p>
            <div>
              <SelectInput
                options={options}
                handleInputChange={setSearch}
                handleChange={handleChange}
                loading={userLoading}
                isMulti={true}
                placeholder="User email"
              />
              <div className="absolute"></div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
