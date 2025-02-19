
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

}