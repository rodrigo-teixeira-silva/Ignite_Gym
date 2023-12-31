import { useNavigation } from "@react-navigation/native"
import {VStack, Image, Text, Center, Heading, ScrollView } from 'native-base'
import { useForm, Controller } from 'react-hook-form'
import * as yup from "yup"
import { yupResolver } from '@hookform/resolvers/yup'

import { AuthNavigationRoutesProps } from "@routes/auth.routes"; 

import BackgroundImg from '@assets/background.png';

import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/input';
import { Button } from '@components/button';



type FormDataProps = {
    email: string;
    password: string;

}

const SignInSchema = yup.object({
    email: yup.string().required('Informe o E-mail.').email('E-mail inválido.'),
    password: yup.string().required('Informe a senha.').min(6, 'Asenha deve ter palo menos 6 digitos.')
});

export function SignIn(){
  
    const { control, handleSubmit, formState: {errors} } = useForm<FormDataProps>({
        resolver: yupResolver(SignInSchema)
    });

    const navigation = useNavigation<AuthNavigationRoutesProps>();

    function handleNewAccount(){
    navigation.navigate('signUp');   
    }
    
    function handleSignIn({email, password}: FormDataProps){
        console.log(email, password);
    }

    return(
      <ScrollView contentContainerStyle={{ flexGrow: 1}} showsVerticalScrollIndicator={false}>
        <VStack flex={1}  px={10} pb={16}>
            <Image
            source={BackgroundImg}
            defaultSource={BackgroundImg}
            alt="Pessoas treinando"
            resizeMode="contain"
            position="absolute"
            />
        <Center my={24}>

            <LogoSvg/>

            <Text color="gray.100" fontSize="sm">
                Treine sua mente e o seu corpo
            </Text>
            
        </Center>    

        <Center>

            <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                Acesse a sua conta 
            </Heading>

            <Controller
                control={control}
                name= "email"
                    render={({ field: {onChange, value}})=>(
                    <Input  placeholder='E-mail'
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={onChange}
                    value={value}
                    errorMessage={errors.email?.message}
                    />
                )}
            />

            <Controller
                control={control}
                name= "password"
                    render={({ field: {onChange, value}})=>(
                    <Input placeholder='Senha'
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                    onSubmitEditing={handleSubmit(handleSignIn)}
                    returnKeyType="send"
                    errorMessage={errors.password?.message}
                    />
                )}
            />


            <Button title="acessar"
            onPress={handleSubmit(handleSignIn)}
            />

        </Center>

        <Center mt={24}>

            <Text color="gray.100" fontSize="sm" mb={3} fontFamily="body">
                Ainda não tem acesso?
            </Text>

            <Button 
                title="Criar conta" 
                variant="outline"
                onPress={handleNewAccount}

            />
        </Center>
    </VStack>
    </ScrollView>
    );
}