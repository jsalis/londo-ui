import { Grid, Box } from "../components";

export default {
    title: "Design System/Grid",
    component: Grid,
    parameters: {
        componentSubtitle: "A responsive grid layout component.",
    },
};

export function Basic() {
    return (
        <Grid columns={12} gap={2}>
            <Box columnSpan={12} p={2} color="white" bg="primary.base">
                1 / 1
            </Box>
            <Box columnSpan={6} p={2} color="white" bg="primary.base">
                1 / 2
            </Box>
            <Box columnSpan={6} p={2} color="white" bg="primary.base">
                2 / 2
            </Box>
            <Box columnSpan={4} p={2} color="white" bg="primary.base">
                1 / 3
            </Box>
            <Box columnSpan={4} p={2} color="white" bg="primary.base">
                2 / 3
            </Box>
            <Box columnSpan={4} p={2} color="white" bg="primary.base">
                3 / 3
            </Box>
            <Box columnSpan={3} p={2} color="white" bg="primary.base">
                1 / 4
            </Box>
            <Box columnSpan={3} p={2} color="white" bg="primary.base">
                2 / 4
            </Box>
            <Box columnSpan={3} p={2} color="white" bg="primary.base">
                3 / 4
            </Box>
            <Box columnSpan={3} p={2} color="white" bg="primary.base">
                4 / 4
            </Box>
        </Grid>
    );
}

export function ColumnFlow() {
    return (
        <Grid gap={2} flow="column" columns="auto">
            <Box rowSpan={24} p={2} color="white" bg="primary.base">
                1 / 1
            </Box>
            <Box rowSpan={12} p={2} color="white" bg="primary.base">
                1 / 2
            </Box>
            <Box rowSpan={12} p={2} color="white" bg="primary.base">
                2 / 2
            </Box>
            <Box rowSpan={8} p={2} color="white" bg="primary.base">
                1 / 3
            </Box>
            <Box rowSpan={8} p={2} color="white" bg="primary.base">
                2 / 3
            </Box>
            <Box rowSpan={8} p={2} color="white" bg="primary.base">
                3 / 3
            </Box>
            <Box rowSpan={6} p={2} color="white" bg="primary.base">
                1 / 4
            </Box>
            <Box rowSpan={6} p={2} color="white" bg="primary.base">
                2 / 4
            </Box>
            <Box rowSpan={6} p={2} color="white" bg="primary.base">
                3 / 4
            </Box>
            <Box rowSpan={6} p={2} color="white" bg="primary.base">
                4 / 4
            </Box>
        </Grid>
    );
}

export function ResponsiveGap() {
    return (
        <Grid columns={2} gap={[1, 2, 3]}>
            <Box columnSpan={2} p={2} color="white" bg="primary.base">
                1 / 1
            </Box>
            <Box p={2} color="white" bg="primary.base">
                1 / 2
            </Box>
            <Box p={2} color="white" bg="primary.base">
                2 / 2
            </Box>
        </Grid>
    );
}

export function ColumnAndRowGap() {
    return (
        <Grid columns={2} columnGap={3} rowGap={1}>
            <Box p={2} color="white" bg="primary.base">
                1 / 2
            </Box>
            <Box p={2} color="white" bg="primary.base">
                2 / 2
            </Box>
            <Box p={2} color="white" bg="primary.base">
                1 / 2
            </Box>
            <Box p={2} color="white" bg="primary.base">
                2 / 2
            </Box>
        </Grid>
    );
}

export function AutoFit() {
    return (
        <Grid gap={2} columns="repeat(auto-fit, minmax(300px, 1fr))">
            <Box p={2} color="white" bg="primary.base">
                A
            </Box>
            <Box p={2} color="white" bg="negative.base">
                B
            </Box>
            <Box p={2} color="white" bg="positive.base">
                C
            </Box>
            <Box p={2} color="white" bg="primary.base">
                D
            </Box>
            <Box p={2} color="white" bg="negative.base">
                E
            </Box>
            <Box p={2} color="white" bg="positive.base">
                F
            </Box>
        </Grid>
    );
}

export function AutoRows() {
    return (
        <Grid gap={2} columns={1} autoRows="80px">
            <Box p={2} color="white" bg="primary.base">
                A
            </Box>
            <Box p={2} color="white" bg="negative.base">
                B
            </Box>
            <Box p={2} color="white" bg="positive.base">
                C
            </Box>
        </Grid>
    );
}

export function AutoColumns() {
    return (
        <Grid gap={2} flow="column" columns={0} autoColumns="80px">
            <Box p={2} color="white" bg="primary.base">
                A
            </Box>
            <Box p={2} color="white" bg="negative.base">
                B
            </Box>
            <Box p={2} color="white" bg="positive.base">
                C
            </Box>
        </Grid>
    );
}

export function Order() {
    return (
        <Grid gap={2} columns={3}>
            <Box p={2} color="white" bg="negative.base" order={2}>
                B
            </Box>
            <Box p={2} color="white" bg="positive.base" order={3}>
                C
            </Box>
            <Box p={2} color="white" bg="primary.base" order={1}>
                A
            </Box>
        </Grid>
    );
}

export function Offset() {
    return (
        <Grid gap={2} columns={3}>
            <Box p={2} color="white" bg="primary.base">
                Top Left
            </Box>
            <Box p={2} color="white" bg="primary.base" columnStart={3}>
                Top Right
            </Box>
            <Box p={2} color="white" bg="primary.base" columnStart={2} rowStart={2}>
                Center
            </Box>
            <Box p={2} color="white" bg="primary.base" rowStart={3}>
                Bottom Left
            </Box>
            <Box p={2} color="white" bg="primary.base" rowStart={3} columnStart={3}>
                Bottom Right
            </Box>
        </Grid>
    );
}

export function Areas() {
    return (
        <Grid
            height="100%"
            minHeight={300}
            gap={2}
            columns="200px 1fr 200px"
            rows="64px 1fr 64px"
            areas={`"header header header"
                "menu content ads"
                "footer footer footer"`}
        >
            <Box p={2} color="white" bg="primary.base" area="header">
                Header
            </Box>
            <Box p={2} color="white" bg="primary.base" area="content">
                Content
            </Box>
            <Box p={2} color="white" bg="primary.base" area="menu">
                Menu
            </Box>
            <Box p={2} color="white" bg="primary.base" area="ads">
                Ads
            </Box>
            <Box p={2} color="white" bg="primary.base" area="footer">
                Footer
            </Box>
        </Grid>
    );
}
