#[cfg(test)]
mod crypt_tests {
    use backend_hash_mfa::cryp::encrypt_password;
    use backend_hash_mfa::cryp::decrypt_password;
    use std::env;

    fn setup_test_env() {
        env::set_var("SECRET_KEY", "12345678901234567890123456789012"); // 32 bytes
    }

    #[test]
    fn teste_criptografia_descriptografia_sucesso() {
        setup_test_env();
        let senha_original = "minha_senha_segura123";
        
        // Criptografa
        let (senha_criptografada, iv) = encrypt_password(senha_original).unwrap();
        
        // Descriptografa
        let senha_descriptografada = decrypt_password(&senha_criptografada, &iv).unwrap();
        
        assert_eq!(senha_original, senha_descriptografada);
    }

    #[test]
    fn teste_criptografia_caracteres_especiais() {
        setup_test_env();
        let senha_original = "!@#$%^&*()_+{}:\"<>?`~çãéêπ∆˚¬≤≥";
        
        let (senha_criptografada, iv) = encrypt_password(senha_original).unwrap();
        let senha_descriptografada = decrypt_password(&senha_criptografada, &iv).unwrap();
        
        assert_eq!(senha_original, senha_descriptografada);
    }

    #[test]
    fn teste_criptografia_senha_vazia() {
        setup_test_env();
        let senha_original = "";
        
        let (senha_criptografada, iv) = encrypt_password(senha_original).unwrap();
        let senha_descriptografada = decrypt_password(&senha_criptografada, &iv).unwrap();
        
        assert_eq!(senha_original, senha_descriptografada);
    }

    #[test]
    fn teste_criptografia_senha_longa() {
        setup_test_env();
        let senha_original = "a".repeat(1000);
        
        let (senha_criptografada, iv) = encrypt_password(&senha_original).unwrap();
        let senha_descriptografada = decrypt_password(&senha_criptografada, &iv).unwrap();
        
        assert_eq!(senha_original, senha_descriptografada);
    }

    #[test]
    fn teste_iv_diferente_cada_criptografia() {
        setup_test_env();
        let senha = "senha_teste";
        
        let (_, iv1) = encrypt_password(senha).unwrap();
        let (_, iv2) = encrypt_password(senha).unwrap();
        
        assert_ne!(iv1, iv2, "IVs devem ser diferentes para cada criptografia");
    }

    #[test]
    fn teste_resultado_diferente_mesma_senha() {
        setup_test_env();
        let senha = "senha_teste";
        
        let (cripto1, _) = encrypt_password(senha).unwrap();
        let (cripto2, _) = encrypt_password(senha).unwrap();
        
        assert_ne!(cripto1, cripto2, "Resultados devem ser diferentes mesmo para a mesma senha");
    }

    #[test]
    fn teste_descriptografia_senha_invalida() {
        setup_test_env();
        let (_, iv) = encrypt_password("senha_teste").unwrap();
        
        let senha_invalida = "YWJjZGVmZ2hpamtsbW5vcA=="; // Dados inválidos em base64
        let resultado = decrypt_password(senha_invalida, &iv);
        
        assert!(resultado.is_err());
    }

    #[test]
    fn teste_concorrencia() {
        use std::thread;
        
        setup_test_env();
        let senha = "senha_concorrente";
        let mut handles = vec![];

        for _ in 0..10 {
            let senha = senha.to_string();
            let handle = thread::spawn(move || {
                let (encrypted, iv) = encrypt_password(&senha).unwrap();
                let decrypted = decrypt_password(&encrypted, &iv).unwrap();
                assert_eq!(senha, decrypted);
            });
            handles.push(handle);
        }

        for handle in handles {
            handle.join().unwrap();
        }
    }

    #[test]
    fn teste_performance() {
        use std::time::Instant;
        
        setup_test_env();
        let senha = "senha_teste";
        let inicio = Instant::now();
        
        for _ in 0..100 {
            let (encrypted, iv) = encrypt_password(senha).unwrap();
            let _ = decrypt_password(&encrypted, &iv).unwrap();
        }
        
        let duracao = inicio.elapsed();
        assert!(duracao.as_secs() < 1, "Operações de criptografia muito lentas!");
    }
}