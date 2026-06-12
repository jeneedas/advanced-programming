import { StyleSheet } from "react-native";

const palette = {
    light: {
        background: "#F5E9D6",
        surface: "#FFF4E6",
        text: "#1C1C1C",
        muted: "#6E6254",
        border: "#1C1C1C",
    },
    dark: {
        background: "#3A3A3A",
        surface: "#2C2C2C",
        text: "#FFFFFF",
        muted: "#C9C9C9",
        border: "#FFFFFF",
    },
};

const styles = StyleSheet.create({
    ScreenLight: {
        flex: 1,
        backgroundColor: palette.light.background,
    },
    ScreenDark: {
        flex: 1,
        backgroundColor: palette.dark.background,
    },
    MainContainerLight: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        paddingHorizontal: 24,
        paddingVertical: 20,
        backgroundColor: palette.light.background,
    },
    MainContainerDark: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 20,
        paddingHorizontal: 24,
        paddingVertical: 20,
        backgroundColor: palette.dark.background,
    },
    CounterContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        gap: 16,
    },
    CounterDisplayContainerBase: {
        minWidth: 100,
        paddingVertical: 14,
        paddingHorizontal: 22,
        borderRadius: 18,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000000",
        shadowOpacity: 0.18,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
        elevation: 4,
    },
    CounterDisplayContainerLight: {
        backgroundColor: palette.light.surface,
        borderColor: palette.light.border,
    },
    CounterDisplayContainerDark: {
        backgroundColor: palette.dark.surface,
        borderColor: palette.dark.border,
    },
    CounterDisplayLight: {
        color: palette.light.text,
        fontSize: 52,
        fontWeight: "700",
    },
    CounterDisplayDark: {
        color: palette.dark.text,
        fontSize: 52,
        fontWeight: "700",
    },
    CounterButtonBase: {
        width: 56,
        height: 56,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000000",
        shadowOpacity: 0.18,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    CounterButtonText: {
        fontSize: 26,
        fontWeight: "700",
    },
    ResetButtonBase: {
        minWidth: 140,
        paddingVertical: 10,
        paddingHorizontal: 26,
        borderRadius: 16,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000000",
        shadowOpacity: 0.18,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    ResetText: {
        fontSize: 18,
        fontWeight: "600",
        letterSpacing: 0.4,
    },
    ThemeToggleContainer: {
        alignItems: "center",
        gap: 8,
        marginTop: 6,
    },
    ThemeButtonBase: {
        minWidth: 120,
        paddingVertical: 10,
        paddingHorizontal: 22,
        borderRadius: 999,
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000000",
        shadowOpacity: 0.18,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
        elevation: 3,
    },
    ThemeLabel: {
        fontSize: 12,
        letterSpacing: 1.1,
        textTransform: "uppercase",
    },
    ThemeButtonText: {
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 0.3,
    },
    SurfaceLight: {
        backgroundColor: palette.light.surface,
        borderColor: palette.light.border,
    },
    SurfaceDark: {
        backgroundColor: palette.dark.surface,
        borderColor: palette.dark.border,
    },
    TextLight: {
        color: palette.light.text,
    },
    TextDark: {
        color: palette.dark.text,
    },
    TextMutedLight: {
        color: palette.light.muted,
    },
    TextMutedDark: {
        color: palette.dark.muted,
    },
});

export default styles;
