import json

def convert_data_from_file(file_path):
    # Define mappings
    nationality_map = {
        'Brasil': 'BR',
        'Español': 'ES'
    }

    role_map = {
        'Solo Laner': 'SOLO',
        'Asesino Flex': 'FLEX',
        'Assassino Flex': 'FLEX',
        'Suporte': 'HEALER',
        'Assassino de Longo Alcance': 'DPS',
        'Soporte': 'HEALER',
        'Asesino a Distancia': 'DPS',
        'Tanque': 'TANK'
    }

    # Read the file content
    with open(file_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    # Process each line
    result = []
    for line in lines[1:]:  # Skip the header line
        parts = line.strip().split('\t')
        if len(parts) >= 6:
            battle_tag = parts[0].split('#')[0]  # Extract battle tag
            name = parts[1]
            nationality = nationality_map.get(parts[2], '')
            primary_role = role_map.get(parts[4], '')
            secondary_role = role_map.get(parts[5], '')
            
            result.append({
                'auctionId': 1,
                'name': name,
                'battleTag': parts[0],
                'nationality': nationality,
                'primaryRole': primary_role,
                'secondaryRole': secondary_role
            })
    
    return result

# Example usage
file_path = 'input.txt'
result = convert_data_from_file(file_path)

# Convert the result to JSON
json_result = json.dumps(result, ensure_ascii=False, indent=2)

# Write the JSON result to output.json
with open('output.json', 'w', encoding='utf-8') as output_file:
    output_file.write(json_result)

print("Results written to output.json")
