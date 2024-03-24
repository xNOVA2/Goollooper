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
        <div className="p-7">
          <div className="flex items-center space-x-10 ">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                className=""
                checked={selectedCheckbox === "all"}
                onCheckedChange={() => setSelectedCheckbox("all")}
              />
              <Label htmlFor="terms">All users</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                className=""
                checked={selectedCheckbox === "selected"}
                onCheckedChange={() => setSelectedCheckbox("selected")}
              />
              <Label htmlFor="terms">Selected Taskers</Label>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="relative mt-3 px-6 ">
          <p className="absolute text-xm text-PrimaryColor px-3 mt-2">Title</p>
          <div className="flex">
            <Input
              type="text"
              placeholder="Title here"
              className="h-16 rounded-lg bg-InputFieldColor pt-7 text-gray-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <div className="absolute"></div>
          </div>
        </div>
        <div className="relative mt-3 px-6 ">
          <p className="absolute  text-xm text-PrimaryColor px-3 mt-2">To</p>
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
      </div>
    </>
  );
}
