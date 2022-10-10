import { Heading } from "../components";

export default {
    title: "Design System/Heading",
    component: Heading,
    parameters: {
        componentSubtitle: "A responsive heading component.",
    },
};

export function Levels() {
    return (
        <>
            <Heading level={1}>h1. Hello World</Heading>
            <Heading level={2}>h2. Hello World</Heading>
            <Heading level={3}>h3. Hello World</Heading>
            <Heading level={4}>h4. Hello World</Heading>
            <Heading level={5}>h5. Hello World</Heading>
        </>
    );
}

export function Colors() {
    return (
        <>
            <Heading level={2} color="primary.base">
                Hello World
            </Heading>
            <Heading level={2} color="success.base">
                Hello World
            </Heading>
            <Heading level={2} color="danger.base">
                Hello World
            </Heading>
            <Heading level={2} color="warning.base">
                Hello World
            </Heading>
            <Heading level={2} color="gray.base">
                Hello World
            </Heading>
        </>
    );
}

export function Disabled() {
    return (
        <Heading level={2} disabled>
            Hello World
        </Heading>
    );
}

export function Underline() {
    return (
        <Heading level={2} underline>
            Hello World
        </Heading>
    );
}

export function Italic() {
    return (
        <Heading level={2} italic>
            Hello World
        </Heading>
    );
}

export function Delete() {
    return (
        <Heading level={2} delete>
            Hello World
        </Heading>
    );
}

export function Uppercase() {
    return (
        <Heading level={2} textTransform="uppercase">
            Hello World
        </Heading>
    );
}
