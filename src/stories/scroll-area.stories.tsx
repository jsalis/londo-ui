import { ScrollArea, Box, Text } from "../components";

export default {
    title: "Design System/ScrollArea",
    component: ScrollArea,
    parameters: {
        componentSubtitle:
            "Augments native scroll functionality for custom, cross-browser styling.",
    },
};

const sampleContent = (
    <>
        <Text as="p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Sed vulputate odio ut enim. Magnis dis
            parturient montes nascetur ridiculus mus. Ultricies mi eget mauris pharetra et. Massa
            sapien faucibus et molestie ac feugiat sed lectus. Tempus imperdiet nulla malesuada
            pellentesque elit. Sit amet aliquam id diam. Aliquam ultrices sagittis orci a. Urna nec
            tincidunt praesent semper feugiat nibh sed pulvinar. Sit amet mauris commodo quis
            imperdiet. Aliquet bibendum enim facilisis gravida neque convallis a cras semper.
        </Text>
        <Text as="p">
            Vitae nunc sed velit dignissim sodales ut eu. Pretium quam vulputate dignissim
            suspendisse in est. Duis ut diam quam nulla porttitor massa id neque aliquam. Volutpat
            ac tincidunt vitae semper quis lectus nulla at. Ac tincidunt vitae semper quis lectus
            nulla at. Quis hendrerit dolor magna eget est. Feugiat in ante metus dictum at tempor
            commodo ullamcorper a. Quis auctor elit sed vulputate mi sit. In ornare quam viverra
            orci sagittis. Magna fringilla urna porttitor rhoncus dolor. Elementum integer enim
            neque volutpat. Elit scelerisque mauris pellentesque pulvinar pellentesque. Aliquet
            lectus proin nibh nisl condimentum id venenatis a.
        </Text>
        <Text as="p">
            Malesuada bibendum arcu vitae elementum curabitur vitae nunc. Potenti nullam ac tortor
            vitae purus faucibus ornare. Facilisis sed odio morbi quis commodo odio aenean sed. Ut
            etiam sit amet nisl purus. Vestibulum mattis ullamcorper velit sed ullamcorper morbi
            tincidunt ornare. Laoreet id donec ultrices tincidunt. Eget nunc lobortis mattis aliquam
            faucibus purus in massa. Enim neque volutpat ac tincidunt. Sem integer vitae justo eget
            magna fermentum. Praesent elementum facilisis leo vel fringilla est ullamcorper eget.
            Luctus accumsan tortor posuere ac ut consequat semper. Viverra nibh cras pulvinar mattis
            nunc sed blandit libero volutpat.
        </Text>
    </>
);

export function Basic(args) {
    return (
        <ScrollArea width={1 / 2} height={300} {...args}>
            <Box p={3} bg="alpha.0">
                {sampleContent}
            </Box>
        </ScrollArea>
    );
}

export function TwoAxis() {
    return (
        <ScrollArea width={300} height={300}>
            <Box p={3} width={400} bg="alpha.0">
                {sampleContent}
            </Box>
        </ScrollArea>
    );
}
