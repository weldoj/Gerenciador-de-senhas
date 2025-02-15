
#[cfg(test)]
mod testes {
    use backend_hash_mfa::auth::*;

    #[test]
    fn teste_geracao_hash() {
        let senha = "minha_senha";
        let hash = hash_senha(senha);
        assert!(hash.is_ok()); // Verifica se o hash foi gerado com sucesso
    }

    #[test]
    fn teste_sal_aleatorio() {
        let senha = "outra_senha";
        let hash1 = hash_senha(senha).unwrap();
        let hash2 = hash_senha(senha).unwrap();
        assert_ne!(hash1, hash2); // hashes devem ser diferentes para o mesmo texto, pois o salt é aleatório
    }
    #[test]
    fn teste_verificacao_correta() {
        let senha = "senha_correta";
        let hash = hash_senha(senha).unwrap();
        let verificacao = verificar_senha(senha, &hash);
        assert!(verificacao.is_ok());
        assert!(verificacao.unwrap()); // A verificação deve ser bem-sucedida
    }
    #[test]
    fn teste_verificacao_incorreta() {
        let senha = "senha_correta";
        let hash = hash_senha(senha).unwrap();
        let verificacao = verificar_senha("senha_errada", &hash);
        assert!(verificacao.is_ok());
        assert!(!verificacao.unwrap()); // A verificação deve falhar
    }

    #[test]
    fn teste_hash_vazio() {
        let senha = "";
        let hash = hash_senha(senha);
        assert!(hash.is_ok()); // Deve ser possível criar um hash mesmo com senha vazia
    }
    #[test]
    fn teste_senha_longa() {
        let senha = "a".repeat(10_000); // Senha de 10.000 caracteres
        let hash = hash_senha(&senha);
        assert!(hash.is_ok());
    }
    #[test]
    fn teste_caracteres_especiais() {
        let senha = "!@#$%^&*()_+{}:\"<>?`~";
        let hash = hash_senha(senha);
        assert!(hash.is_ok());
    }
    #[test]
    fn teste_hash_malformado() {
        let senha = "senha123";
        let resultado = verificar_senha(senha, "hash_invalido");
        assert!(resultado.is_err()); // Deve retornar erro ao verificar um hash inválido
    }

    use std::time::Instant;

    #[test]
    fn teste_performance_hash() {
        let senha = "minha_senha";
        let inicio = Instant::now();
        let _ = hash_senha(senha);
        let duracao = inicio.elapsed();
        
        assert!(duracao.as_millis() < 1000, "Hash demorou muito para ser gerado!");
    }
    #[test]
    fn teste_forca_bruta() {
        let senha_correta = "123456"; // Senha fraca
        let hash = hash_senha(senha_correta).unwrap();
        let dicionario = ["123456", "senha123", "password", "admin"];

        let senha_quebrada = dicionario.iter().any(|s| verificar_senha(s, &hash).unwrap());

        assert!(senha_quebrada, "Ataque de força bruta falhou inesperadamente!");
    }

    #[test]
    fn teste_verificacao_unicode() {
        let senha = "senha_🔒_セキュリティ";
        let hash = hash_senha(senha).unwrap();
        let verificacao = verificar_senha(senha, &hash);
        assert!(verificacao.is_ok());
        assert!(verificacao.unwrap());
    }

    #[test]
    fn teste_multiplas_verificacoes_mesmo_hash() {
        let senha = "senha_teste";
        let hash = hash_senha(senha).unwrap();

        for _ in 0..100 {
            let verificacao = verificar_senha(senha, &hash);
            assert!(verificacao.is_ok());
            assert!(verificacao.unwrap());
        }
    }

    #[test]
    fn teste_tamanho_minimo_hash() {
        let senha = "123";
        let hash = hash_senha(senha).unwrap();
        assert!(hash.len() >= 64, "Hash muito curto, pode indicar problemas de segurança");
    }
    #[test]
    fn teste_tentativas_sequenciais() {
        let senha_correta = "senha_correta";
        let hash = hash_senha(senha_correta).unwrap();
        let tentativas = ["senha1", "senha2", "senha_correta", "senha4"];

        let mut sucessos = 0;
        for tentativa in tentativas.iter() {
            if verificar_senha(tentativa, &hash).unwrap() {
                sucessos += 1;
            }
        }

        assert_eq!(sucessos, 1, "Apenas uma senha deveria ter sido verificada com sucesso");
    }
    #[test]
    fn teste_hash_reutilizacao() {
        let senha1 = "senha123";
        let senha2 = "senha123";
        let hash1 = hash_senha(senha1).unwrap();
        let hash2 = hash_senha(senha2).unwrap();

        // Verifica se os hashes são diferentes mesmo para senhas iguais
        assert_ne!(hash1, hash2);

        // Verifica se ambos os hashes funcionam para a mesma senha
        assert!(verificar_senha(senha1, &hash1).unwrap());
        assert!(verificar_senha(senha2, &hash2).unwrap());
    }

}