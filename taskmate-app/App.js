import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import { useState } from 'react';
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

// 🛑 QUAN TRỌNG: BẠN HÃY TỰ ĐIỀN ĐỊA CHỈ IP CỦA BẠN VÀO ĐÂY NHÉ!
// 1. Mở Terminal mới (nhấn Ctrl + Shift + `)
// 2. Gõ chữ "ipconfig" rồi nhấn Enter.
// 3. Tìm dòng chữ "IPv4 Address" (Ví dụ nó ghi là 192.168.1.15 hoặc 192.168.0.100)
// 4. Thay dải số đó vào vị trí bên dưới. 
// (Lưu ý: Nếu bạn chạy máy ảo Android Emulator trên máy tính, hãy dùng: 'http://10.0.2.2:8000/api')
const API_URL = 'http://192.168.6.32:8000/api'; // <--- ĐÃ THAY IP CỦA BẠN VÀO ĐÂY RỒI NHÉ

const Stack = createNativeStackNavigator();

// --- MÀN HÌNH XÁC THỰC (GỘP ĐĂNG NHẬP & ĐĂNG KÝ) ---
function AuthScreen({ navigation }) {
    const [isLoginTab, setIsLoginTab] = useState(true); // true = Đăng nhập, false = Đăng ký
    const [role, setRole] = useState('parent'); // 'parent' hoặc 'worker'

    const [username, setUsername] = useState(''); // Ở backend đang dùng username thay vì email
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Xử lý Gửi API (Đăng nhập / Đăng ký)
    const handleSubmit = async () => {
        if (!username || !password) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        setLoading(true);
        try {
            if (isLoginTab) {
                // LUỒNG ĐĂNG NHẬP
                const response = await axios.post(`${API_URL}/auth/login/`, { username, password });
                await AsyncStorage.setItem('userToken', response.data.tokens.access);
                await AsyncStorage.setItem('userRole', response.data.role);

                if (response.data.role === 'parent') {
                    navigation.replace('ParentHome');
                } else {
                    navigation.replace('WorkerHome');
                }
            } else {
                // LUỒNG ĐĂNG KÝ
                await axios.post(`${API_URL}/auth/register/`, { username, password, role });
                Alert.alert('Thành công', 'Đăng ký thành công! Vui lòng đăng nhập.');
                setIsLoginTab(true); // Tự động chuyển qua tab Đăng nhập
            }
        } catch (error) {
            Alert.alert('Lỗi', isLoginTab ? 'Sai thông tin hoặc chưa bật Backend!' : 'Tên tài khoản đã tồn tại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerText}>Educarelink</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Khung Form Trắng */}
                <View style={styles.card}>
                    {/* Lời chào */}
                    <View style={styles.greetingSection}>
                        <Text style={styles.title}>{isLoginTab ? 'Chào mừng trở lại!' : 'Tạo tài khoản mới'}</Text>
                        <Text style={styles.subtitle}>Kết nối tri thức, nuôi dưỡng tương lai cùng Educarelink.</Text>
                    </View>

                    {/* Thanh chuyển đổi Tab (Đăng nhập / Đăng ký) */}
                    <View style={styles.tabContainer}>
                        <View style={styles.tabBackground}>
                            <TouchableOpacity style={[styles.tabButton, isLoginTab && styles.tabActive]} onPress={() => setIsLoginTab(true)}>
                                <Text style={[styles.tabText, isLoginTab && styles.tabTextActive]}>Đăng nhập</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.tabButton, !isLoginTab && styles.tabActive]} onPress={() => setIsLoginTab(false)}>
                                <Text style={[styles.tabText, !isLoginTab && styles.tabTextActive]}>Đăng ký</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* CHỈ HIỆN KHI ĐANG Ở TAB ĐĂNG KÝ: Chọn vai trò */}
                    {!isLoginTab && (
                        <View style={styles.roleSection}>
                            <Text style={styles.label}>Bạn là ai?</Text>
                            <View style={styles.roleRow}>
                                <TouchableOpacity style={[styles.roleBox, role === 'parent' ? styles.roleBoxActive : styles.roleBoxInactive]} onPress={() => setRole('parent')}>
                                    <View style={[styles.iconCircle, role === 'parent' ? styles.iconCircleActive : styles.iconCircleInactive]}>
                                        <MaterialIcons name="groups" size={24} color={role === 'parent' ? '#0051d5' : '#3d4947'} />
                                    </View>
                                    <Text style={[styles.roleText, role === 'parent' ? styles.roleTextLabelActive : styles.roleTextLabelInactive]}>Phụ Huynh</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.roleBox, role === 'worker' ? styles.roleBoxActive : styles.roleBoxInactive]} onPress={() => setRole('worker')}>
                                    <View style={[styles.iconCircle, role === 'worker' ? styles.iconCircleActive : styles.iconCircleInactive]}>
                                        <MaterialIcons name="work" size={24} color={role === 'worker' ? '#0051d5' : '#3d4947'} />
                                    </View>
                                    <Text style={[styles.roleText, role === 'worker' ? styles.roleTextLabelActive : styles.roleTextLabelInactive]}>Carepartner</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}

                    {/* Form nhập liệu */}
                    <View style={styles.formSection}>
                        <Text style={styles.label}>Tên tài khoản (hoặc SĐT)</Text>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="mail" size={20} color="#3d4947" style={styles.inputIcon} />
                            <TextInput style={styles.input} placeholder="name@example.com" value={username} onChangeText={setUsername} autoCapitalize="none" />
                        </View>

                        <View style={styles.passwordHeader}>
                            <Text style={styles.label}>Mật khẩu</Text>
                            {isLoginTab && <TouchableOpacity><Text style={styles.forgotPassword}>Quên mật khẩu?</Text></TouchableOpacity>}
                        </View>
                        <View style={styles.inputContainer}>
                            <MaterialIcons name="lock" size={20} color="#3d4947" style={styles.inputIcon} />
                            <TextInput style={styles.input} placeholder="••••••••" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} />
                            <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                                <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={20} color="#3d4947" />
                            </TouchableOpacity>
                        </View>

                        {/* Nút Đăng Nhập/Đăng Ký chính */}
                        <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit} disabled={loading}>
                            {loading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <View style={styles.buttonContent}>
                                    <Text style={styles.primaryButtonText}>{isLoginTab ? 'Tiếp tục' : 'Tạo tài khoản'}</Text>
                                    <MaterialIcons name="arrow-forward" size={20} color="#fff" />
                                </View>
                            )}
                        </TouchableOpacity>
                    </View>

                    {/* Mạng xã hội */}
                    <View style={styles.dividerContainer}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>HOẶC {isLoginTab ? 'ĐĂNG NHẬP' : 'ĐĂNG KÝ'} VỚI</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    <View style={styles.socialRow}>
                        <TouchableOpacity style={styles.socialButton}>
                            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} style={styles.socialIcon} />
                            <Text style={styles.socialText}>Google</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.socialButton}>
                            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/124/124010.png' }} style={styles.socialIcon} />
                            <Text style={styles.socialText}>Facebook</Text>
                        </TouchableOpacity>
                    </View>

                </View>

                {/* Footer */}
                <Text style={styles.footerText}>© 2024 Educarelink. Nền tảng chăm sóc và giáo dục hàng đầu.</Text>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

// --- MÀN HÌNH TẠM THỜI CHỜ BƯỚC SAU ---
function ParentHomeScreen() {
    return <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}><Text style={styles.title}>Trang chủ Phụ Huynh</Text></View>;
}
function WorkerHomeScreen() {
    return <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}><Text style={styles.title}>Trang chủ Carepartner</Text></View>;
}

// --- LUỒNG ĐIỀU HƯỚNG ---
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Auth" component={AuthScreen} />
                <Stack.Screen name="ParentHome" component={ParentHomeScreen} />
                <Stack.Screen name="WorkerHome" component={WorkerHomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

// --- CSS CHUYỂN TỪ TAILWIND HTML SANG REACT NATIVE ---
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f9fa' },
    header: { height: 64, backgroundColor: 'rgba(255,255,255,0.9)', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, width: '100%', zIndex: 10 },
    headerText: { fontSize: 20, fontWeight: '900', color: '#0d9488' }, // Teal-600
    scrollContent: { padding: 24, paddingTop: 100, paddingBottom: 50, alignItems: 'center' },

    card: { width: '100%', maxWidth: 480, backgroundColor: '#ffffff', borderRadius: 24, padding: 24, shadowColor: '#0051d5', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.06, shadowRadius: 20, elevation: 5 },
    greetingSection: { alignItems: 'center', marginBottom: 24 },
    title: { fontSize: 28, fontWeight: '800', color: '#191c1d', marginBottom: 8, textAlign: 'center' },
    subtitle: { fontSize: 14, color: '#3d4947', textAlign: 'center' },

    tabContainer: { marginBottom: 30 },
    tabBackground: { flexDirection: 'row', backgroundColor: '#f3f4f5', borderRadius: 12, padding: 4 },
    tabButton: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
    tabActive: { backgroundColor: '#ffffff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1 },
    tabText: { fontSize: 14, fontWeight: '600', color: '#3d4947' },
    tabTextActive: { color: '#0051d5' },

    roleSection: { marginBottom: 24 },
    label: { fontSize: 14, fontWeight: '700', color: '#191c1d', marginBottom: 8 },
    roleRow: { flexDirection: 'row', justifyContent: 'space-between' },
    roleBox: { flex: 1, padding: 16, borderRadius: 16, borderWidth: 2, alignItems: 'center', marginHorizontal: 5 },
    roleBoxActive: { borderColor: '#0051d5', backgroundColor: 'rgba(0, 81, 213, 0.05)' },
    roleBoxInactive: { borderColor: 'transparent', backgroundColor: '#f3f4f5' },
    iconCircle: { width: 48, height: 48, borderRadius: 24, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    iconCircleActive: { backgroundColor: 'rgba(0, 81, 213, 0.1)' },
    iconCircleInactive: { backgroundColor: '#ffffff' },
    roleTextLabelActive: { fontSize: 14, fontWeight: '700', color: '#0051d5' },
    roleTextLabelInactive: { fontSize: 14, fontWeight: '700', color: '#3d4947' },

    formSection: { marginBottom: 24 },
    inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#ffffff', borderWidth: 1, borderColor: 'rgba(188, 201, 198, 0.3)', borderRadius: 12, paddingHorizontal: 16, height: 52, marginBottom: 16 },
    inputIcon: { marginRight: 12 },
    input: { flex: 1, height: '100%', fontSize: 14, color: '#191c1d' },
    eyeIcon: { padding: 5 },
    passwordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
    forgotPassword: { fontSize: 12, fontWeight: '600', color: '#0051d5', marginBottom: 8 },

    primaryButton: { backgroundColor: '#0051d5', borderRadius: 12, height: 56, justifyContent: 'center', alignItems: 'center', shadowColor: '#0051d5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 8, elevation: 4 },
    buttonContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
    primaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700', marginRight: 8 },

    dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
    dividerLine: { flex: 1, height: 1, backgroundColor: 'rgba(188, 201, 198, 0.2)' },
    dividerText: { marginHorizontal: 10, fontSize: 12, color: '#3d4947', fontWeight: '500' },

    socialRow: { flexDirection: 'row', justifyContent: 'space-between' },
    socialButton: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 48, borderWidth: 1, borderColor: 'rgba(188, 201, 198, 0.3)', borderRadius: 12, marginHorizontal: 5 },
    socialIcon: { width: 20, height: 20, marginRight: 10 },
    socialText: { fontSize: 14, fontWeight: '600', color: '#191c1d' },

    footerText: { marginTop: 32, fontSize: 12, color: '#3d4947', textAlign: 'center' }
});