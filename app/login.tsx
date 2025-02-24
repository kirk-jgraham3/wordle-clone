import { StyleSheet, Text, ScrollView, TextInput, TouchableOpacity, View } from 'react-native'
import { useRouter } from 'expo-router';
import { useOAuth } from '@clerk/clerk-expo';
import { Colors } from '@/constants/Colors';
import { defaultStyles } from '@/constants/Styles';
import { Ionicons } from '@expo/vector-icons';

enum Strategy {
  Google = 'oauth_google',
  Facebook = 'oauth_facebook',
  Apple = 'oauth_apple',
}

const Page = () => {

  const router = useRouter();

  const { startOAuthFlow: googleAuth } = useOAuth({strategy: Strategy.Google});
  const { startOAuthFlow: facebookAuth } = useOAuth({strategy: Strategy.Facebook});
  const { startOAuthFlow: appleAuth } = useOAuth({strategy: Strategy.Apple});

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Facebook]: facebookAuth,
      [Strategy.Apple]: appleAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.push("/");
      }

    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Log in or create an account</Text>
      <Text style={styles.subText}>
        By continuing, you agree to the Terms of Sale, Terms of Service, and Privacy Policy.
      </Text>

      <Text style={styles.inputLabel}>Email address</Text>
      <TextInput style={styles.input} placeholder="Email" />

      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>

      <View style={styles.seperatorView}>
        <View style={styles.hr} />
        <Text style={styles.seperator}>OR</Text>
        <View style={styles.hr} />
      </View>

      <View style={{ gap: 10 }}>

        <TouchableOpacity style={styles.btnOutline} onPress={()=>onSelectAuth(Strategy.Google)}>
          <Ionicons name="logo-google" size={24} color={Colors.light.gray} style={styles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={()=>onSelectAuth(Strategy.Facebook)}>
        <Ionicons name="logo-facebook" size={24} color={Colors.light.gray} style={styles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Facebook</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={()=>onSelectAuth(Strategy.Apple)}>
        <Ionicons name="logo-apple" size={24} color={Colors.light.gray} style={styles.btnIcon} />
          <Text style={styles.btnOutlineText}>Continue with Apple</Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  )
}

export default Page

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 40,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 30,
    paddingBottom: 20,
    textAlign: 'center',
  },
  subText: {
    fontSize: 15,
    color: '#4f4f4f',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputLabel: {
    paddingBottom: 5,
    fontWeight: 500,
  },
  seperatorView: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 30,
  },
  seperator: {
    fontFamily: 'mon-sb',
    color: Colors.light.gray,
    fontSize: 16,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    height: 50,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  btnIcon: {
    paddingRight: 10,
  },
  hr: {
    flex: 1,
    borderBottomColor: 'black',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});