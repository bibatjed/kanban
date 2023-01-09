import React, { forwardRef } from "react";

export const Item = forwardRef(({ id, ...props }: { id: string }) => {
  return <div {...props}>{id}</div>;
});
