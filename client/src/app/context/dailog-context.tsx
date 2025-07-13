'use client'
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react"

// Corrected type definition for setComponent
interface contextType {
    Component: React.ReactNode | null;
    setComponent: React.Dispatch<React.SetStateAction<React.ReactNode | null>>;
}

export const DialogContext = React.createContext<contextType>({
    Component: null,
    setComponent: () => { },
});

const DailogContextProvider = (props: React.PropsWithChildren) => {
    const [Component, setComponent] = React.useState<React.ReactNode | null>(null);
    return (
        <DialogContext.Provider value={{ Component, setComponent }}>
            {props.children}   {/* Always render your app! */}
            {Component && (
                <Dialog open onOpenChange={()=>setComponent(null)}>
                    <DialogContent className="max-w-full max-h-full scrollbar-hide overflow-y-auto">
                        {Component}
                    </DialogContent>
                </Dialog>
            )}
        </DialogContext.Provider>
    );

};

export default DailogContextProvider;