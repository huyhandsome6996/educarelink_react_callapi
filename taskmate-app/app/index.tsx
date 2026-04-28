// 🛑 LƯU Ý QUAN TRỌNG: FILE NÀY PHẢI NẰM TRONG THƯ MỤC 'app' VÀ CÓ TÊN LÀ 'index.js'
// Đường dẫn chính xác trên máy tính của bạn: app/index.js

import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer, NavigationIndependentTree } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import axios from 'axios';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

// Địa chỉ IP máy tính của bạn (Đã lấy từ cmd của bạn: 192.168.6.32)
const API_URL = 'http://192.168.6.32:8000/api';

const Stack = createNativeStackNavigator();

// --- MÀN HÌNH XÁC THỰC (GỘP ĐĂNG NHẬP & ĐĂNG KÝ) ---
function AuthScreen({ navigation }) {
  const [isLoginTab, setIsLoginTab] = useState(true); // true: Đăng nhập, false: Đăng ký
  const [role, setRole] = useState('parent'); // 'parent' hoặc 'worker'

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Hàm xử lý gửi yêu cầu đến Backend Django
  const handleSubmit = async () => {
    if (!username || !password) {
      Alert.alert('Thông báo', 'Vui lòng nhập đầy đủ tài khoản và mật khẩu!');
      return;
    }

    setLoading(true);
    try {
      if (isLoginTab) {
        // LUỒNG ĐĂNG NHẬP
        const response = await axios.post(`${API_URL}/auth/login/`, { username, password });

        // Lưu Token và Role vào bộ nhớ điện thoại
        if (response.data.tokens) {
          await AsyncStorage.setItem('userToken', response.data.tokens.access);
        }
        await AsyncStorage.setItem('userRole', response.data.role);

        // Chuyển màn hình dựa trên vai trò
        if (response.data.role === 'parent') {
          navigation.replace('ParentHome');
        } else {
          navigation.replace('WorkerHome');
        }
      } else {
        // LUỒNG ĐĂNG KÝ
        await axios.post(`${API_URL}/auth/register/`, {
          username,
          password,
          role
        });
        Alert.alert('Thành công', 'Tạo tài khoản thành công! Bạn có thể đăng nhập ngay.');
        setIsLoginTab(true);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.error || 'Lỗi kết nối! Hãy kiểm tra Backend và IP: ' + API_URL;
      Alert.alert('Lỗi', errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Educarelink</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          {/* Lời chào */}
          <View style={styles.greetingSection}>
            <Text style={styles.title}>{isLoginTab ? 'Chào mừng trở lại!' : 'Tạo tài khoản mới'}</Text>
            <Text style={styles.subtitle}>Kết nối tri thức, nuôi dưỡng tương lai cùng Educarelink.</Text>
          </View>

          {/* Tab Switcher */}
          <View style={styles.tabContainer}>
            <View style={styles.tabBackground}>
              <TouchableOpacity
                style={[styles.tabButton, isLoginTab && styles.tabActive]}
                onPress={() => setIsLoginTab(true)}
              >
                <Text style={[styles.tabText, isLoginTab && styles.tabTextActive]}>Đăng nhập</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tabButton, !isLoginTab && styles.tabActive]}
                onPress={() => setIsLoginTab(false)}
              >
                <Text style={[styles.tabText, !isLoginTab && styles.tabTextActive]}>Đăng ký</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Role Selector (Chỉ hiện khi Đăng ký) */}
          {!isLoginTab && (
            <View style={styles.roleSection}>
              <Text style={styles.label}>Bạn là ai?</Text>
              <View style={styles.roleRow}>
                <TouchableOpacity
                  style={[styles.roleBox, role === 'parent' ? styles.roleBoxActive : styles.roleBoxInactive]}
                  onPress={() => setRole('parent')}
                >
                  <View style={[styles.iconCircle, role === 'parent' ? styles.iconCircleActive : styles.iconCircleInactive]}>
                    <MaterialIcons name="groups" size={24} color={role === 'parent' ? '#0051d5' : '#3d4947'} />
                  </View>
                  <Text style={[styles.roleText, role === 'parent' ? styles.roleTextLabelActive : styles.roleTextLabelInactive]}>Phụ Huynh</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.roleBox, role === 'worker' ? styles.roleBoxActive : styles.roleBoxInactive]}
                  onPress={() => setRole('worker')}
                >
                  <View style={[styles.iconCircle, role === 'worker' ? styles.iconCircleActive : styles.iconCircleInactive]}>
                    <MaterialIcons name="work" size={24} color={role === 'worker' ? '#0051d5' : '#3d4947'} />
                  </View>
                  <Text style={[styles.roleText, role === 'worker' ? styles.roleTextLabelActive : styles.roleTextLabelInactive]}>Carepartner</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Form */}
          <View style={styles.formSection}>
            <Text style={styles.label}>Tên tài khoản hoặc SĐT</Text>
            <View style={styles.inputContainer}>
              <MaterialIcons name="person" size={20} color="#3d4947" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Ví dụ: phuhuynh_a"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.passwordHeader}>
              <Text style={styles.label}>Mật khẩu</Text>
              {isLoginTab && (
                <TouchableOpacity>
                  <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                </TouchableOpacity>
              )}
            </View>
            <View style={styles.inputContainer}>
              <MaterialIcons name="lock" size={20} color="#3d4947" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                <MaterialIcons name={showPassword ? "visibility" : "visibility-off"} size={20} color="#3d4947" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <View style={styles.buttonContent}>
                  <Text style={styles.primaryButtonText}>{isLoginTab ? 'Tiếp tục' : 'Bắt đầu ngay'}</Text>
                  <MaterialIcons name="arrow-forward" size={20} color="#fff" />
                </View>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>HOẶC ĐĂNG NHẬP VỚI</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/124/124010.png' }}
                style={styles.socialIcon}
              />
              <Text style={styles.socialText}>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>

        <Text style={styles.footerText}>© 2024 Educarelink. Nền tảng chăm sóc và giáo dục hàng đầu.</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function ParentHomeScreen() {
  return (
    <View style={styles.centerView}>
      <Text style={styles.title}>Trang chủ Phụ Huynh</Text>
      <Text>Đang tải dữ liệu của bạn...</Text>
    </View>
  );
}

function WorkerHomeScreen() {
  return (
    <View style={styles.centerView}>
      <Text style={styles.title}>Trang chủ Carepartner</Text>
      <Text>Tìm kiếm việc làm mới nhất...</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationIndependentTree>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="ParentHome" component={ParentHomeScreen} />
          <Stack.Screen name="WorkerHome" component={WorkerHomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NavigationIndependentTree>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: {
    height: 64,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingTop: Platform.OS === 'ios' ? 20 : 0
  },
  headerText: { fontSize: 20, fontWeight: '900', color: '#0d9488' },
  scrollContent: { padding: 24, paddingTop: 40, paddingBottom: 50, alignItems: 'center' },
  centerView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },

  card: {
    width: '100%',
    maxWidth: 480,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#0051d5',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5
  },
  greetingSection: { alignItems: 'center', marginBottom: 24 },
  title: { fontSize: 26, fontWeight: '800', color: '#191c1d', marginBottom: 8, textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#3d4947', textAlign: 'center', lineHeight: 20 },

  tabContainer: { marginBottom: 30 },
  tabBackground: { flexDirection: 'row', backgroundColor: '#f3f4f5', borderRadius: 12, padding: 4 },
  tabButton: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  tabActive: { backgroundColor: '#ffffff', elevation: 2 },
  tabText: { fontSize: 14, fontWeight: '600', color: '#3d4947' },
  tabTextActive: { color: '#0051d5' },

  roleSection: { marginBottom: 24 },
  label: { fontSize: 14, fontWeight: '700', color: '#191c1d', marginBottom: 8 },
  roleRow: { flexDirection: 'row', justifyContent: 'space-between' },
  roleBox: { flex: 1, padding: 16, borderRadius: 16, borderWidth: 2, alignItems: 'center', marginHorizontal: 4 },
  roleBoxActive: { borderColor: '#0051d5', backgroundColor: '#f0f4ff' },
  roleBoxInactive: { borderColor: 'transparent', backgroundColor: '#f3f4f5' },
  iconCircle: { width: 44, height: 44, borderRadius: 22, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  iconCircleActive: { backgroundColor: '#e0e9ff' },
  iconCircleInactive: { backgroundColor: '#ffffff' },
  roleText: { fontSize: 13, fontWeight: '700' },
  roleTextLabelActive: { color: '#0051d5' },
  roleTextLabelInactive: { color: '#3d4947' },

  formSection: { marginBottom: 20 },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e1e3e4',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 54,
    marginBottom: 16
  },
  inputIcon: { marginRight: 12 },
  input: { flex: 1, height: '100%', fontSize: 15, color: '#191c1d' },
  eyeIcon: { padding: 5 },
  passwordHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  forgotPassword: { fontSize: 12, fontWeight: '600', color: '#0051d5', marginBottom: 8 },

  primaryButton: {
    backgroundColor: '#0051d5',
    borderRadius: 12,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  },
  buttonContent: { flexDirection: 'row', alignItems: 'center' },
  primaryButtonText: { color: '#ffffff', fontSize: 16, fontWeight: '700', marginRight: 8 },

  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#eee' },
  dividerText: { marginHorizontal: 10, fontSize: 11, color: '#999', fontWeight: '700' },

  socialRow: { flexDirection: 'row', justifyContent: 'space-between' },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 12,
    marginHorizontal: 4
  },
  socialIcon: { width: 18, height: 18, marginRight: 8 },
  socialText: { fontSize: 14, fontWeight: '600', color: '#333' },

  footerText: { marginTop: 40, fontSize: 11, color: '#999', textAlign: 'center' }
});