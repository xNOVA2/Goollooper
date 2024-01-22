'use client'

import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function PushInfomation({}) {
    return (<><div>
            <div className="p-7">
              <div className="flex items-center space-x-10 ">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" className="" />
                  <Label htmlFor="terms">All users</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" className="" />
                  <Label htmlFor="terms">Selected Taskers</Label>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 ">
            <div className="relative mt-3 px-6 ">
              <p className="absolute  text-xm text-PrimaryColor px-3 mt-2">
                Title
              </p>
              <div className="flex">
                <Input type="text" placeholder="Title here" className="h-16 rounded-lg bg-InputFieldColor pt-7 text-gray-400" />
                <div className="absolute"></div>
              </div>
            </div>
            <div className="relative mt-3 px-6 ">
              <p className="absolute  text-xm text-PrimaryColor px-3 mt-2">
                To
              </p>
              <div className="flex">
                <Input type="text" placeholder="user email" className="h-16 rounded-lg bg-InputFieldColor pt-7 text-gray-400" />
                <div className="absolute"></div>
              </div>
            </div>
          </div></>);
  }
