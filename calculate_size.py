import os

def get_directory_size(directory, exclude_dirs=None):
    total_size = 0
    exclude_dirs = exclude_dirs or []
    for dirpath, dirnames, filenames in os.walk(directory):
        if any(exclude in dirpath for exclude in exclude_dirs):
            continue
        for f in filenames:
            fp = os.path.join(dirpath, f)
            total_size += os.path.getsize(fp)
    return total_size

# Proje dizinleri ve hariç tutulan dizinler
project_directory = '.'
exclude_dirs = ['node_modules', os.path.join('backend', 'node_modules'), os.path.join('frontend', 'node_modules')]

size_in_bytes = get_directory_size(project_directory, exclude_dirs)
size_in_mb = size_in_bytes / (1024 * 1024)
print(f"Proje boyutu (node_modules hariç): {size_in_mb:.2f} MB")
