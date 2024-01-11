import { FC, ReactNode, memo } from "react";
import { Header } from "../organisms/layout/Header";
import { Footer } from "../organisms/layout/Footer";

type Props = {
    children: ReactNode;
}

export const FullLayout: FC<Props> = memo((props) => {
    const {children} = props;
    return(
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
})